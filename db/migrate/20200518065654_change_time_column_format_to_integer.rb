class ChangeTimeColumnFormatToInteger < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :min_timem, :integer
    add_column :matches, :min_timeh, :integer
    add_column :matches, :max_timem, :integer
    add_column :matches, :max_timeh, :integer
  end
end
