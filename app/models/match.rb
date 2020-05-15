# frozen_string_literal: true

class Match < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :owner, class_name: 'User'

  validates :title, presence: true
  validates :max_date, presence: true
  validates_presence_of :user_ids, :message => 'Please select at least one attendee'

  def attendees
    user_ids.map do |user_id|
      User.find(user_id)
    end
  end
end
