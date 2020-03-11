# frozen_string_literal: true

class Match < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :owner, class_name: 'User'

  validates :title, presence: true
  validates :max_date, presence: true

  def attendees
    user_ids.map do |user_id|
      User.find(user_id)
    end
  end
end
