class AddColumnOfMinTimeAndMaxTimeDatetime < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :min_time, :datetime
    add_column :matches, :max_time, :datetime
  end
end
