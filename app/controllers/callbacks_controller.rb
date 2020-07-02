# frozen_string_literal: true
require 'pry'
class CallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.find_for_google_oauth2(request.env['omniauth.auth'])
    if @user
      sign_in @user
      current_user.settings == false ? (redirect_to user_edit_path) : (redirect_to root_path)
    else
      redirect_to new_user_session_path, notice: 'Access Denied.'
    end
  end
end
