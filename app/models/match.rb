class Match < ApplicationRecord
  has_and_belongs_to_many :users
  belongs_to :owner, class_name: 'User'

  validates :title, presence: true
  validates :max_date, presence: true

end
