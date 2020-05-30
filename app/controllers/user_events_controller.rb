# frozen_string_literal: true

require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'date'
require 'fileutils'

class UserEventsController < ApplicationController
  def events_google_calendar
    GoogleRefresh.refresh_all(current_user)
  end

  def index
    events_google_calendar
    @userevents = current_user.reload.user_events
  end
end
