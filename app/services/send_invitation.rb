class SendInvitation



  def self.new(params,current_user)

        client = Google::Apis::CalendarV3::CalendarService.new
    # return unless (current_user.present? && current_user.access_token.present? && current_user.refresh_token.present?)
    # secrets = Google::APIClient::ClientSecrets.new({
    #   "web" => {
    #     "access_token" => current_user.access_token,
    #     "refresh_token" => current_user.refresh_token,
    #     "client_id" => ENV["GOOGLE_API_KEY"],
    #     "client_secret" => ENV["GOOGLE_API_SECRET"]
    #   }
    # })
    # begin
    #   client.authorization = secrets.to_authorization
    #   client.authorization.grant_type = "refresh_token"




    event = Google::Apis::CalendarV3::Event.new(
      summary: 'Google I/O 2015',
      location: '800 Howard St., San Francisco, CA 94103',
      description: 'A chance to hear more about Google\'s developer products.',
      start: Google::Apis::CalendarV3::EventDateTime.new(
        date_time: '2020-04-01T09:00:00-00:00'
        # time_zone: 'America/Los_Angeles'
      ),
      end: Google::Apis::CalendarV3::EventDateTime.new(
        date_time: '2015-05-28T17:00:00-00:00'
        # time_zone: 'America/Los_Angeles'
      ),
      recurrence: [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      attendees: [
        Google::Apis::CalendarV3::EventAttendee.new(
          email: 'nicolay.sara@gmail.com'
        )
        # Google::Apis::CalendarV3::EventAttendee.new(
        #   email: 'sbrin@example.com'
        # )
      ],
      reminders: Google::Apis::CalendarV3::Event::Reminders.new(
        use_default: false,
        overrides: [
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'email',
            minutes: 24 * 60
          ),
          Google::Apis::CalendarV3::EventReminder.new(
            reminder_method: 'popup',
            minutes: 10
          )
        ]
      )
    )
    result = client.insert_event('primary', event)
    puts "Event created: #{result.html_link}"
  end
end

