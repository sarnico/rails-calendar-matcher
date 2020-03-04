class ChangeTypeMaxDateIntoDateInsteadDatetime < ActiveRecord::Migration[5.2]
  def change
    change_column :matches, :max_date, :date
    change_column :matches, :min_date, :date
  end
end
