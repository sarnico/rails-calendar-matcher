class AddGoogleIdForMatch < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :google_id, :string
  end
end
