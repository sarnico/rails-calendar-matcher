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
    set_match = Match.last
    set_match.max_date
    set_match.max_time
    set_match.min_time

    raise
    groupe=[1, 2]
    groupe.each do |user|
      user
      raise
    end

  end



end
