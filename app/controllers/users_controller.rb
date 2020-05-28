# frozen_string_literal: true

class UsersController < ApplicationController
  def show
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      current_user.settings = true
      current_user.save
      redirect_to root_path
    else
      render 'edit'
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :last_name, :birthdate, :phone_number, :country, :city)
  end
end
