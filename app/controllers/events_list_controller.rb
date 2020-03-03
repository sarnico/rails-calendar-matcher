class EventsListController < ApplicationController

  def index
  @client = Google::APIClient.new
  @client.execute(api_method:
    @service.calendar_list.list)
    calendars = JSON.parse(response.body)
  end
end
