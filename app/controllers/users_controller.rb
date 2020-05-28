# frozen_string_literal: true

class UsersController < ApplicationController
  def show
  end

  def after_sign_up
  end

  def update
    if current_user.update(user_params)
      current_user.sign_in_count = current_user.sign_in_count + 1
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
