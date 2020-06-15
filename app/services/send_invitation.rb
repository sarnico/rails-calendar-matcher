class SendInvitation

    def self.event_settings(match_info)
      # time of the event
      match_date = match_info.match_date.strftime("%F")
      min_time = match_info.min_time.strftime("%T%:z")
      max_time = match_info.max_time.strftime("%T%:z")
      @start_time = "#{match_date}T#{min_time}"
      @end_time = "#{match_date}T#{max_time}"

      #time fo the reminder
      @minutes = ((@start_time.to_time-Time.now) / 60).to_i


      @attendeesList = Match.find(id=match_info.id).users.map{|user| Google::Apis::CalendarV3::EventAttendee.new(email: "#{user.email}")}
      @attendeesList<<Google::Apis::CalendarV3::EventAttendee.new(email: "#{User.find(id=match_info.owner_id).email}")

    end

    def self.create_calendar_event(match_info)
       @new_event_payload = Google::Apis::CalendarV3::Event.new(
        summary: "summary",
        description: "description",
        start: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: Time.now.iso8601,
          time_zone: 'Europe/Brussels'
        ),
        end: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: (Time.now+10.minutes).iso8601,
          time_zone: 'Europe/Brussels'
        ),
      )
      new_event = @client.insert_event('primary',@new_event_payload)
      match_info.update_attribute(:google_id, new_event.id)
      @client.get_event('primary',new_event.id)

  end

  def self.update_calendar_event(match_info,google_event)
    event_settings(match_info)
    update_event_payload = Google::Apis::CalendarV3::Event.new(
      summary: "CalendarMatcher -#{match_info.title}",
      description: "Descritption: #{match_info.description}",
      start: Google::Apis::CalendarV3::EventDateTime.new(
        date_time: @start_time,
        time_zone: 'Europe/Brussels'
      ),
     end: Google::Apis::CalendarV3::EventDateTime.new(
        date_time: @end_time,
        time_zone: 'Europe/Brussels'
      ),
      attendees:  @attendeesList,
      conference_data:{
        },
      reminders: Google::Apis::CalendarV3::Event::Reminders.new(
        use_default: false,
        overrides: [
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'email',
            minutes: @minutes
          ),
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'popup',
            minutes: 30
          )
        ]
      )
    )

    updated_event = @client.update_event('primary',match_info.google_id,update_event_payload)

  end

  def self.google_authorization(current_user)

    begin

      authorization = GoogleRefresh.auth_client(current_user)
      @client = Google::Apis::CalendarV3::CalendarService.new
      @client.authorization = authorization

      yield


    rescue ::Google::Apis::AuthorizationError => e
      authorization.grant_type = 'refresh_token'
      authorization.access_token = current_user.token
      authorization.refresh_token = current_user.refresh_token
      response = authorization.refresh!
      current_user.token = response['access_token']
      current_user.save

      retry

    end
  end

  def self.create_google_event(match_info, current_user)

    google_authorization(current_user) do
      google_event = create_calendar_event(match_info)
      updated_google_event = update_calendar_event(match_info,google_event.id)

    end
  end

    def self.update_google_event(match_info, current_user)

    google_authorization(current_user) do
      updated_google_event = update_calendar_event(match_info, match_info.google_id)
    end
  end

end




# class SendInvitation

#     def self.create_calendar_event(match_info)
#     match_date = match_info.match_date.strftime("%F")
#     min_time = match_info.min_time.strftime("%T%:z")
#     max_time = match_info.max_time.strftime("%T%:z")
#     @start_time = "#{match_date}T#{min_time}"
#     @end_time = "#{match_date}T#{max_time}"
#     @minutes = ((@start_time.to_time-Time.now) / 60).to_i



#     @new_event_payload = Google::Apis::CalendarV3::Event.new(
#       summary: "CalendarMatcher -#{match_info.title}",
#       description: "Descritption: #{match_info.description}",
#       start: Google::Apis::CalendarV3::EventDateTime.new(
#         date_time: @start_time,
#         time_zone: 'Europe/Brussels'
#       ),
#       end: Google::Apis::CalendarV3::EventDateTime.new(
#         date_time: @end_time,
#         time_zone: 'Europe/Brussels'
#       ),
#     )
#     new_event = @client.insert_event('primary',@new_event_payload)
#     @client.get_event('primary',new_event.id)
#   end

#   def self.update_calendar_event(match_info,google_event)
#     attendeesList = Match.find(id=match_info.id).users.map{|user| Google::Apis::CalendarV3::EventAttendee.new(email: "#{user.email}")}
#     attendeesList<<Google::Apis::CalendarV3::EventAttendee.new(email: "#{User.find(id=match_info.owner_id).email}")

#     update_event_payload = Google::Apis::CalendarV3::Event.new(
#       summary: "CalendarMatcher -#{match_info.title}",
#       description: "Descritption: #{match_info.description}",
#       start: Google::Apis::CalendarV3::EventDateTime.new(
#         date_time: @start_time,
#         time_zone: 'Europe/Brussels'
#       ),
#      end: Google::Apis::CalendarV3::EventDateTime.new(
#         date_time: @end_time,
#         time_zone: 'Europe/Brussels'
#       ),
#       attendees:  attendeesList,
#       conference_data:{
#         },
#       reminders: Google::Apis::CalendarV3::Event::Reminders.new(
#         use_default: false,
#         overrides: [
#           Google::Apis::CalendarV3::EventReminder.new(
#             reminder_method: 'email',
#             minutes: @minutes
#           ),
#           Google::Apis::CalendarV3::EventReminder.new(
#             reminder_method: 'popup',
#             minutes: 30
#           )
#         ]
#       )
#     )

#     updated_event = @client.update_event('primary',google_event.id,update_event_payload)

#   end

#   def self.create_google_event(match_info,current_user)

#     begin

#       authorization = GoogleRefresh.auth_client(current_user)
#       @client = Google::Apis::CalendarV3::CalendarService.new
#       @client.authorization = authorization

#       google_event = create_calendar_event(match_info)
#       updated_google_event = update_calendar_event(match_info,google_event)
#       match_info.update_attribute(:google_id, updated_google_event.id)

#     rescue ::Google::Apis::AuthorizationError => e
#       authorization.grant_type = 'refresh_token'
#       authorization.access_token = current_user.token
#       authorization.refresh_token = current_user.refresh_token
#       response = authorization.refresh!
#       current_user.token = response['access_token']
#       current_user.save

#       retry

#     end
#   end


# end
