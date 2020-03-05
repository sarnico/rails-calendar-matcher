class Group < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :creater, class_name: 'User'

  validates :name, presence: true
end
