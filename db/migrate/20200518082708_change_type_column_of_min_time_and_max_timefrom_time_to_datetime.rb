class ChangeTypeColumnOfMinTimeAndMaxTimefromTimeToDatetime < ActiveRecord::Migration[5.2]
  def change
    remove_column :matches, :min_time
    remove_column :matches, :max_time
 end
end
