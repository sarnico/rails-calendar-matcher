# frozen_string_literal: true

class UsersController < ApplicationController
  def show
  end

  def after_sign_up
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path, :notice => "Welcome on Calendar Matcher!"
    else
      render 'after_sign_up'
    end
  end

  private

  def user_params
    returned_params = params.require(:user).permit(:name, :last_name, :birthdate, :phone_number, :country, :city)
  end
end
