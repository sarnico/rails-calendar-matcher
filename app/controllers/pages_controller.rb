require "google/apis/calendar_v3"
require "googleauth"
require "googleauth/stores/file_token_store"
require "date"
require "fileutils"

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home


  def home
  end

  def test
    user1 = User.first
    user2 = User.last
    set_match = Match.last


    set_match.min_date ? t_initial = set_match.min_date : t_initial = Date.today
    t_final = set_match.max_date

    a = (t_initial..t_final).map do |t|
      # set_match.users.count do |u|
      [user1, user2].count do |u|
        u.user_events.any? do |event|
          event.start_time.to_date == t
        end
      end
    end
    raise
  end
end
