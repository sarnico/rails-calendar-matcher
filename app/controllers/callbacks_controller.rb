# frozen_string_literal: true
require 'pry'
class CallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.find_for_google_oauth2(request.env['omniauth.auth'])
    if @user
      sign_in @user
      redirect_to ((current_user.sign_in_count == 0) ? after_sign_up_path : root_path )
      if (current_path == after_sign_up_path)
        if current_user.save
          redirect_to root_path
        else
          render 'new'
        end
      end
      current_user.sign_in_count += 1
    else
      redirect_to root_path, notice: 'Access Denied.'
    end
  end
end
