# require 'google/apis/calendar_v3'
# require 'googleauth'
# require 'googleauth/stores/file_token_store'
# require 'date'
# require 'fileutils'

class SendInvitation


  def self.new(params,current_user)

    # raise

    # params[:user_ids]


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
        summary: params[:title],
        location: params[:location],
        description: params[:description],
        start: Google::Apis::CalendarV3::EventDateTime.new(
          date_time: '2020-04-15T09:00:00-07:00',
          time_zone: 'America/Los_Angeles'
          ),
      end: Google::Apis::CalendarV3::EventDateTime.new(
        date_time: '2020-04-15T17:00:00-07:00',
        time_zone: 'America/Los_Angeles'
        ),
      recurrence: [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      attendees: [
        Google::Apis::CalendarV3::EventAttendee.new(
          email: 'nicolay.sara@gmail.com'
          ),
        Google::Apis::CalendarV3::EventAttendee.new(
          email: 'gaetan.quets@gmail.com'
          )
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
      result = service.insert_event('primary', event)
      puts "Event created: #{result.html_link}"
    end
  end

