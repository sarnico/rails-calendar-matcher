# frozen_string_literal: true
class CallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.find_for_google_oauth2(request.env['omniauth.auth'])
    if @user
      sign_in @user
      redirect_to ((current_user.sign_in_count == 0) ? after_sign_up_path : root_path )
      current_user.sign_in_count += 1
    else
      redirect_to root_path, notice: 'Access Denied.'
    end
  end
end
