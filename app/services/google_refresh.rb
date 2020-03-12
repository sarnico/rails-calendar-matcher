class GoogleRefresh

  def self.to_params(current_user)
    { 'refresh_token' => current_user.refresh_token,
      'client_id'     => ENV['GOOGLE_CLIENT_ID'],
      'client_secret' => ENV['GOOGLE_CLIENT_SECRET'],
      'grant_type'    => 'refresh_token'}
  end

#     SCOPE = Rails.application.config.google_calendar_scope_uri
#     CLIENT_ID = Rails.application.secrets.google_oauth_client_id
#     CLIENT_SECRET = Rails.application.secrets.google_oauth_client_secret
#     GOOGLE_TOKEN_CREDENTIAL = Rails.application.config.google_token_credential_uri
#     MAX_RESULTS = 75

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

#     def self.connect_service
#       @client = auth_client
#       service = ::Google::Apis::CalendarV3::CalendarService.new
#       service.authorization = @client
#       service
#     end

  def self.auth_client(current_user)
    Signet::OAuth2::Client.new(
      client_id: ENV['GOOGLE_CLIENT_ID'],
      client_secret:  ENV['GOOGLE_CLIENT_SECRET'],
      token_credential_uri: "https://accounts.google.com/o/oauth2/token",
      access_token: current_user.token,
      refresh_token: current_user.refresh_token,
    )
  end



#     def self.auth_client
#       Signet::OAuth2::Client.new(
#         client_id: CLIENT_ID,
#         client_secret: CLIENT_SECRET,
#         token_credential_uri: GOOGLE_TOKEN_CREDENTIAL,
#         scope: SCOPE,
#         state: "account_id=#{@account.id}",
#         access_token: @account.google_token&.access_token,
#         refresh_token: @account.google_token&.refresh_token
#       )
#     end

  def self.refresh_all(current_user, min_date = DateTime.now.rfc3339, max_date = nil)
    begin
    current_user.user_events.destroy_all
    #refresh!(current_user)
    authorization = auth_client(current_user)
    service = Google::Apis::CalendarV3::CalendarService.new
    service.authorization = authorization
    calendar_id = "primary"

#     def self.refresh_token
#       response = @client.refresh!
#       access_token = response["access_token"]
#       refresh_token = response["refresh_token"]
#       token = @account.google_token
#       refresh_token.present? ? token.update(access_token: access_token, refresh_token: refresh_token) : token.update(access_token: access_token)
#       true
#     rescue ::Signet::AuthorizationError
#       disconnect_calendar
#       false
#     ensure
#       false
#     end

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

    rescue ::Google::Apis::AuthorizationError => e
#       puts "Couldn't get calendars_list due to and error from Google API : #{e.message}; Retrying..."
    response = authorization.refresh!
    current_user.token = response["access_token"]
    current_user.refresh_token = response["refresh_token"]
    current_user.save#
    retry
  end
end



#     def self.calendar_events(account, calendar_id, time_min, time_max)
#       @account = account
#       return unless @account.google_calendar_connected?
#       service = connect_service
#       service.list_events(
#         calendar_id,
#         max_results: MAX_RESULTS,
#         single_events: true,
#         order_by: 'startTime',
#         time_min: time_min,
#         time_max: time_max
#       )
#     rescue ::Google::Apis::AuthorizationError => e
#       puts "Couldn't get calendars_list due to and error from Google API : #{e.message}; Retrying..."
#       refresh_token
#       retry
#     end

end


# class Google


#     def self.calendars_list(account)
#       @account = account
#       return unless @account.google_token
#       service = connect_service
#       service.list_calendar_lists
#     rescue ::Google::Apis::AuthorizationError => e
#       puts "Couldn't get calendars_list due to and error from Google API : #{e.message}; Retrying..."
#       refresh_token
#       retry
#     end


#     def self.calendar_users(account, calendar_id)
#       @account = account
#       return unless @account.google_token
#       service = connect_service
#       service.list_acls(calendar_id).items.select { |u| (u.scope.type.eql? 'user') && !(u.id.include? 'group.calendar') }
#     rescue ::Google::Apis::ClientError
#       []
#     rescue ::Google::Apis::AuthorizationError
#       []
#     end


#     def self.disconnect_calendar
#       puts '=' * 100
#       puts "I'm disconnecting Google calendar from account #{@account.id} because resfreshing the token failed (AuthorizationError: probably user revoked access outside Calendar Matcher) ..."
#       puts '=' * 100
#       @account.google_token.destroy
#       @account.update_column(:google_calendar_id, nil)
#       @account.users.update_all(google_calendar_email: nil)
#     end


#   end




#------------------------------------------------------------------------------------------

# class Google
#     SCOPE = Rails.application.config.google_calendar_scope_uri
#     CLIENT_ID = Rails.application.secrets.google_oauth_client_id
#     CLIENT_SECRET = Rails.application.secrets.google_oauth_client_secret
#     GOOGLE_TOKEN_CREDENTIAL = Rails.application.config.google_token_credential_uri
#     MAX_RESULTS = 75
#     def self.calendars_list(account)
#       @account = account
#       return unless @account.google_token
#       service = connect_service
#       service.list_calendar_lists
#     rescue ::Google::Apis::AuthorizationError => e
#       puts "Couldn't get calendars_list due to and error from Google API : #{e.message}; Retrying..."
#       refresh_token
#       retry
#     end
#     def self.calendar_users(account, calendar_id)
#       @account = account
#       return unless @account.google_token
#       service = connect_service
#       service.list_acls(calendar_id).items.select { |u| (u.scope.type.eql? 'user') && !(u.id.include? 'group.calendar') }
#     rescue ::Google::Apis::ClientError
#       []
#     rescue ::Google::Apis::AuthorizationError
#       []
#     end
#     def self.calendar_events(account, calendar_id, time_min, time_max)
#       @account = account
#       return unless @account.google_calendar_connected?
#       service = connect_service
#       service.list_events(
#         calendar_id,
#         max_results: MAX_RESULTS,
#         single_events: true,
#         order_by: 'startTime',
#         time_min: time_min,
#         time_max: time_max
#       )
#     rescue ::Google::Apis::AuthorizationError => e
#       puts "Couldn't get calendars_list due to and error from Google API : #{e.message}; Retrying..."
#       refresh_token
#       retry
#     end
#     def self.connect_service
#       @client = auth_client
#       service = ::Google::Apis::CalendarV3::CalendarService.new
#       service.authorization = @client
#       service
#     end
#     def self.auth_client
#       Signet::OAuth2::Client.new(
#         client_id: CLIENT_ID,
#         client_secret: CLIENT_SECRET,
#         token_credential_uri: GOOGLE_TOKEN_CREDENTIAL,
#         scope: SCOPE,
#         state: "account_id=#{@account.id}",
#         access_token: @account.google_token&.access_token,
#         refresh_token: @account.google_token&.refresh_token
#       )
#     end
#     def self.refresh_token
#       response = @client.refresh!
#       access_token = response["access_token"]
#       refresh_token = response["refresh_token"]
#       token = @account.google_token
#       refresh_token.present? ? token.update(access_token: access_token, refresh_token: refresh_token) : token.update(access_token: access_token)
#       true
#     rescue ::Signet::AuthorizationError
#       disconnect_calendar
#       false
#     ensure
#       false
#     end
#     def self.disconnect_calendar
#       puts '=' * 100
#       puts "I'm disconnecting Google calendar from account #{@account.id} because resfreshing the token failed (AuthorizationError: probably user revoked access outside Yuman) ..."
#       puts '=' * 100
#       @account.google_token.destroy
#       @account.update_column(:google_calendar_id, nil)
#       @account.users.update_all(google_calendar_email: nil)
#     end
#   end

#------------------------------------------------------------------------------------------------















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
