class SendInvitation
  def self.new(match_info,current_user)

    #dans les arguments, il faudrait pouvoir envoyer la timezone des personnes qui font le  match

    match_date = match_info.match_date.strftime("%F")
    min_time = match_info.min_time.strftime("%T%:z")
    max_time = match_info.max_time.strftime("%T%:z")
    start_time = "#{match_date}T#{min_time}"
    end_time = "#{match_date}T#{max_time}"

    minutes = ((start_time.to_time-Time.now) / 60).to_i

    attendeesList = Match.find(id=match_info.id).users.map{|user| Google::Apis::CalendarV3::EventAttendee.new(email: "#{user.email}")}
    attendeesList<<Google::Apis::CalendarV3::EventAttendee.new(email: "#{User.find(id=match_info.owner_id).email}")

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
        summary: "CalendarMatcher -#{match_info.title}",
        location: match_info.location,
        description: "Descritption: #{match_info.description}",


         start: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: start_time,
          time_zone: 'Europe/Brussels'
          ),
        end: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: end_time,
          time_zone: 'Europe/Brussels'
          ),

      attendees:  attendeesList,

      reminders: Google::Apis::CalendarV3::Event::Reminders.new(
        use_default: false,
        overrides: [
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'email',
            minutes: minutes
            ),
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'popup',
            minutes: 30
            )
        ]
        )
      )

      result = service.insert_event('primary', event)

      updated_event = Google::Apis::CalendarV3::Event.new(
        conference_data: {
          conference_id: 4,
          create_request:{
            request_id:7,
            }
        },
        summary: "CalendarMatcher -#{match_info.title}",
        location: match_info.location,
        description: "Descritption: #{match_info.description}",


         start: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: start_time,
          time_zone: 'Europe/Brussels'
          ),
        end: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: end_time,
          time_zone: 'Europe/Brussels'
          ),

      attendees:  attendeesList,

      reminders: Google::Apis::CalendarV3::Event::Reminders.new(
        use_default: false,
        overrides: [
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'email',
            minutes: minutes
            ),
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'popup',
            minutes: 30
            )
        ]
        )
      )

      updated_result = service.update_event('primary', result.id, updated_event)

      puts "Event created: #{updated_result.html_link}"

    end
  end

