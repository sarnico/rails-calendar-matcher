# frozen_string_literal: true

class UsersController < ApplicationController
  def show
  end

  def after_sign_up
  end

  def update
    if current_user.update(user_params)
      current_user.settings = true
      current_user.save
      redirect_to root_path
    else
      render 'after_sign_up'
    end
  end

  private

  def user_params
    returned_params = params.require(:user).permit(:name, :last_name, :birthdate, :phone_number, :country, :city, :settings)
  end
end
