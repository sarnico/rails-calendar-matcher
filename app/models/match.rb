class Match < ApplicationRecord
  has_many :users, through: :jct_user_matches

  validates :title, presence: true
  validates :min_date, presence: true, default: Time.now
  validates :max_date, presence: true

end
