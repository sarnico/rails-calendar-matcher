class AddDefaultValueToMinDateToMatchModel < ActiveRecord::Migration[5.2]
  def change
    change_column :matches, :min_date, :datetime, default: Time.now
  end
end
