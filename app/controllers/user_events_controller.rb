# frozen_string_literal: true

require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'date'
require 'fileutils'

class UserEventsController < ApplicationController
  def events_google_calendar
    # Methode pour effacer les anciens events du calendrier Google afin de les recharger.
    GoogleRefresh.refresh_all(current_user)
  end

  # def events_google_calendar_all
  #   @users = User.all
  #   @users.each do |user|
  #     GoogleRefresh.refresh_all(user)
  #   end
  # end

  # def index
  #   events_google_calendar
  #   @userevents = current_user.reload.user_events
  # end
end

