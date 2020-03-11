# frozen_string_literal: true

class UsersGroup < ApplicationRecord
  belongs_to :user
  belongs_to :group
end
