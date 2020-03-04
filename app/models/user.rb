class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, :omniauth_providers => [:google_oauth2]


  has_and_belongs_to_many :matches
  has_many :user_events


  def self.find_for_google_oauth2(auth)
    data = auth.info
    user = User.where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = data.email
      user.avatar = data.image
      user.password = Devise.friendly_token[0,20]
    end
    user.token = auth.credentials.token
    user.refresh_token = auth.credentials.refresh_token
    user.save
    return user
  end
end

