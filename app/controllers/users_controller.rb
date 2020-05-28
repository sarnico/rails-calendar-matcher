# frozen_string_literal: true

class UsersController < ApplicationController
  def show
  end

  def edit
    @user = current_user
  end

  def update
    if @user.update(user_params)
      @user.settings = true
      @user.save
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
