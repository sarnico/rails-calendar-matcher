# frozen_string_literal: true

class Group < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :creater, class_name: 'User'

  validates :name, presence: true

  def members
    user_ids.map do |user_id|
      User.find(user_id)
    end
  end
end
