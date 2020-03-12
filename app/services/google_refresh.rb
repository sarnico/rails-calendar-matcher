class GoogleRefresh
  def self.to_params(current_user)
    { 'refresh_token' => current_user.refresh_token,
      'client_id'     => ENV['GOOGLE_CLIENT_ID'],
      'client_secret' => ENV['GOOGLE_CLIENT_SECRET'],
      'grant_type'    => 'refresh_token'}
  end

  def self.request_token_from_google(current_user)
    url = URI("https://accounts.google.com/o/oauth2/token")
    Net::HTTP.post_form(url, self.to_params(current_user))
  end

  def self.refresh!(current_user)
    data = JSON.parse(request_token_from_google(current_user).body)
    binding.pry
    current_user.token  = data['access_token'],
    current_user.save
    binding.pry
  end

  def self.connect_service
    @client = auth_client
    service = ::Google::Apis::CalendarV3::CalendarService.new
    service.authorization = @client
    service
  end

  def self.auth_client(current_user)
    Signet::OAuth2::Client.new(
      client_id: ENV['GOOGLE_CLIENT_ID'],
      client_secret:  ENV['GOOGLE_CLIENT_SECRET'],
      token_credential_uri: "https://accounts.google.com/o/oauth2/token",
      access_token: current_user.token,
      refresh_token: current_user.refresh_token,
      grant_type: "authorization_code"
    )
  end

  def self.refresh_all(current_user, min_date = DateTime.now.rfc3339, max_date = nil)
    begin
      current_user.user_events.destroy_all
      #refresh!(current_user)
      authorization = auth_client(current_user)
      service = Google::Apis::CalendarV3::CalendarService.new
      service.authorization = authorization
      calendar_id = 'primary'
      @response = if max_date.nil?
                    service.list_events(calendar_id,
                                        max_results: 20,
                                        single_events: true,
                                        order_by: 'startTime',
                                        time_min: min_date)
                  else
                    service.list_events(calendar_id,
                                        single_events: true,
                                        order_by: 'startTime',
                                        time_min: min_date,
                                        time_max: max_date)
                  end
      if @response.items.any?
        @response.items.each do |event|
          start = event.start.date || event.start.date_time
          ended = event.end.date || event.end.date_time
          UserEvent.create!(user: current_user, start_time: start, end_time: ended, summary: event.summary)
        end
      end
    rescue ::Google::Apis::AuthorizationError => e
      # puts "Couldn't get calendars_list due to and error from Google API : #{e.message}; Retrying..."
      response = authorization.refresh!
      current_user.token = response["access_token"]
      current_user.refresh_token = response["refresh_token"]
      current_user.save#
      retry
    end
  end
end
