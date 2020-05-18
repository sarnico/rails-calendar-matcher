# frozen_string_literal: true

class Match < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :owner, class_name: 'User'

  validates :title, presence: true
  validates :max_date, presence: true
  validates :min_timem, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 60 }
  validates :max_timem, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 60 }
  validates :min_timeh, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 25 }
  validates :max_timeh, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 25 }

  def attendees
    user_ids.map do |user_id|
      User.find(user_id)
    end
  end
end
