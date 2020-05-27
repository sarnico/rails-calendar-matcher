# frozen_string_literal: true

class UsersController < ApplicationController
  def show
  end

  def after_sign_up
  end

  def update
    @user = User.update(user_params)
    if @user
      raise
      redirect_to root_path, :notice => "Welcome on Calendar Matcher!"
    else
      render 'new'
    end
  end

  private

  def user_params
    params.permit(:name, :last_name, :birthdate, :phone_number, :country, :city)
  end
end
