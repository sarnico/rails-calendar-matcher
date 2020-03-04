class Match < ApplicationRecord
  has_many :users, through: :jct_user_matches
  belongs_to :owner, class_name: 'User'

  validates :title, presence: true
  validates :max_date, presence: true

end
