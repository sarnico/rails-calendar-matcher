class SendInvitation
  def self.new(match_info,current_user)

    match_date = match_info.match_date.strftime("%F")
    min_time = match_info.min_time.strftime("%T%:z")
    max_time = match_info.max_time.strftime("%T%:z")
    start_time = "#{match_date}T#{min_time}"
    end_time = "#{match_date}T#{max_time}"

    attendeesList = Match.find(id=match_info.id).users.map{|user| Google::Apis::CalendarV3::EventAttendee.new(email: "#{user.email}")}
    attendeesList<<Google::Apis::CalendarV3::EventAttendee.new(email: "#{User.find(id=match_info.owner_id).email}")


    # # List of attendees coming from the MATCH -- USING PARAMS DATA !!!
    # attendeesList = params[:user_ids].map{|user_id| Google::Apis::CalendarV3::EventAttendee.new(email: "#{User.find(id=user_id).email}")}
    # attendeesList<<Google::Apis::CalendarV3::EventAttendee.new(email: "#{current_user.email}")


    begin
      @client = GoogleRefresh.auth_client(current_user)
      service = ::Google::Apis::CalendarV3::CalendarService.new
      service.authorization = @client

    rescue ::Google::Apis::AuthorizationError => e
      authorization.grant_type  = "refresh_token"
      authorization.access_token = current_user.token
      authorization.refresh_token = current_user.refresh_token
      response = authorization.refresh!
      current_user.token = response["access_token"]
      current_user.save

    retry
    end



      event = Google::Apis::CalendarV3::Event.new(
        summary: match_info.title,
        location: match_info.location,
        description: match_info.description,
        start: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: start_time,
          time_zone: 'Europe/Brussels'
          ),
        end: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: end_time,
          time_zone: 'Europe/Brussels'
          ),
      # recurrence: [
      #   'RRULE:FREQ=DAILY;COUNT=2'
      # ],
      attendees:  attendeesList,
      reminders: Google::Apis::CalendarV3::Event::Reminders.new(
        use_default: false,
        overrides: [
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'email',
            minutes: 3
            # minutes: ((start_time.to_time-Time.now)/60000).to_i
            ),
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'popup',
            minutes: 30
            )
        ]
        )
      )
      result = service.insert_event('primary', event)
      puts "Event created: #{result.html_link}"
    end
  end

