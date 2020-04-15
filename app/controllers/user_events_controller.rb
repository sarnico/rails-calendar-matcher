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

# class UserEventsController < ApplicationController
#   def index
#     authorization = Signet::OAuth2::Client.new(access_token: current_user.token)
#     service = Google::Apis::CalendarV3::CalendarService.new
#     service.authorization = authorization

#     # Fetch the next 10 events for the user
#     calendar_id = "primary"

# @response = service.list_events(calendar_id,
#                                 max_results:   20,
#                                 single_events: true,
#                                 order_by:      "startTime",
#                                 time_min:      DateTime.now.rfc3339)

#     if @response.items.any?
#       @response.items.each do |event|
#         start = event.start.date || event.start.date_time
#         ended = event.end.date || event.end.date_time
#         UserEvent.create!(user: current_user, start_time: start, end_time: ended)
#       end
#     end
#   end
# end
