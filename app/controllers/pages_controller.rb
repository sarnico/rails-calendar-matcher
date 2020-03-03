require "google/apis/calendar_v3"
require "googleauth"
require "googleauth/stores/file_token_store"
require "date"
require "fileutils"

class PagesController < ApplicationController
  def home
  end
  # def home
  #   authorization = Signet::OAuth2::Client.new(access_token: current_user.token)
  #   service = Google::Apis::CalendarV3::CalendarService.new
  #   service.authorization = authorization

  #   # Fetch the next 10 events for the user
  #   calendar_id = "primary"

  #   @response = service.list_events(calendar_id,
  #                                  max_results:   10,
  #                                  single_events: true,
  #                                  order_by:      "startTime",
  #                                  time_min:      DateTime.now.rfc3339)

  # end
end

    # authorization = Signet::OAuth2::Client.new(access_token: current_user.token)
    # service = Google::Apis::CalendarV3::CalendarService.new
    # service.authorization = authorization

    # # Fetch the next 10 events for the user
    # calendar_id = "primary"
    # response = service.list_events(calendar_id,
    #                                max_results:   10,
    #                                single_events: true,
    #                                order_by:      "startTime",
    #                                time_min:      DateTime.now.rfc3339)
    # puts "Upcoming events:"
    # puts "No upcoming events found" if response.items.empty?
    # response.items.each do |event|
    #   start = event.start.date || event.start.date_time
    #   ended = event.end.date || event.end.date_time
    #   puts "- #{event.summary} (#{start}) - (#{ended})"
