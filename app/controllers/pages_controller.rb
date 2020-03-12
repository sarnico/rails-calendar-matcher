# frozen_string_literal: true

require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'date'
require 'fileutils'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home; end

  def test
    FindMatch.date
    raise
  end
end
