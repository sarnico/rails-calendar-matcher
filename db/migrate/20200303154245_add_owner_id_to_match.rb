class AddOwnerIdToMatch < ActiveRecord::Migration[5.2]
  def change
    add_reference :matches, :user, index: true
  end
end
