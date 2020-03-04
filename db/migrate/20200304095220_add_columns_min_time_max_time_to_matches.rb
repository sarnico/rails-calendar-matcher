class AddColumnsMinTimeMaxTimeToMatches < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :max_time, :time
    add_column :matches, :min_time, :time
  end
end
