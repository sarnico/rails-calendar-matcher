class PagesController < ApplicationController
  def home
    binding.pry
      @client = Google::APIClient.new
  @client.execute(api_method:
    @service.calendar_list.list)
    calendars = JSON.parse(response.body)
  end
end
