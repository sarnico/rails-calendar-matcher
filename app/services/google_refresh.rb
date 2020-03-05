class GoogleRefresh

  def self.refresh_all(current_user, min_date = DateTime.now.rfc3339, max_date = nil)
    current_user.user_events.destroy_all

    authorization = Signet::OAuth2::Client.new(access_token: current_user.token)
    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = authorization

    # Fetch the next 10 events for the user
    calendar_id = "primary"

    if max_date == nil
      @response = service.list_events(calendar_id,
                                max_results:   20,
                                single_events: true,
                                order_by:      "startTime",
                                time_min:      min_date)
    else
      @response = service.list_events(calendar_id,
                                      single_events: true,
                                      order_by:      "startTime",
                                      time_min:      min_date,
                                      time_max:      max_date)
    end

    if @response.items.any?
      @response.items.each do |event|
        start = event.start.date || event.start.date_time
        ended = event.end.date || event.end.date_time
        UserEvent.create!(user: current_user, start_time: start, end_time: ended, summary: event.summary)
      end
    end
  end

end

# @client.execute(:api_method => @service.events.insert,
#   :parameters => {'calendarId' => calendar_id,
#     'sendNotifications' => true},
#   :body => JSON.dump(event),
#   :headers => {'Content-Type' => 'application/json'})


# class GoogleRefresh

#   def self.refresh_all(current_user)
#     current_user.user_events.destroy_all

#     authorization = Signet::OAuth2::Client.new(access_token: current_user.token)
#     service = Google::Apis::CalendarV3::CalendarService.new
#     service.authorization = authorization

#     # Fetch the next 10 events for the user
#     calendar_id = "primary"


#     @response = service.list_events(calendar_id,
#                                     max_results:   20,
#                                     single_events: true,
#                                     order_by:      "startTime",
#                                     time_min:      DateTime.now.rfc3339)


#     if @response.items.any?
#       @response.items.each do |event|
#         start = event.start.date || event.start.date_time
#         ended = event.end.date || event.end.date_time
#         UserEvent.create!(user: current_user, start_time: start, end_time: ended, summary: event.summary)
#       end
#     end
#   end

# end
