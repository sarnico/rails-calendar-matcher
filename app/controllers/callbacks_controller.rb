# frozen_string_literal: true
class CallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.find_for_google_oauth2(request.env['omniauth.auth'])
    if @user
      sign_in @user
      # redirect_to root_path
      current_user.settings == false ? (redirect_to after_sign_up_path) : (redirect_to root_path)
    else
      redirect_to new_user_session_path, notice: 'Access Denied.'
    end

      # if current_user.sign_in_count == false
      #   redirect_to after_sign_up_path
      # else
      #   redirect_to root_path
      # end
      # redirect_to ((current_user.sign_in_count == false) ? after_sign_up_path : root_path )
  end
end
