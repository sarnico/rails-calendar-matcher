# # frozen_string_literal: true

# require 'google/apis/calendar_v3'

# class GoogleCalendarWrapper < ApplicationRecord
#   def initialize(current_user)
#     configure_client(current_user)
#   end

#   def configure_client(_current_user)
#     @client = Google::Apis::CalendarV3::CalendarService.new
#     # @client.authorization.access_token = current_user.token
#     # @client.authorization.refresh_token = current_user.refresh_token
#     # @client.authorization.client_id = ENV['GOOGLE_CLIENT_ID']
#     # @client.authorization.client_secret = ENV['GOOGLE_CLIENT_SECRET']
#     # @client.authorization.refresh!
#     @service = @client.discovered_api('calendar', 'v3')
#     response = @client.execute(api_method: @service.calendar_list.list)
#     calendars = JSON.parse(response.body)
#   end

#   def post_event
#     @client.execute(api_method: @service.events.insert,
#                     parameters: { 'calendarId' => current_user.email,
#                                   'sendNotifications' => true },
#                     body: JSON.dump(event),
#                     headers: { 'Content-Type' => 'application/json' })
#   end
# end
