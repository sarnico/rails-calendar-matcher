class AddColumnGroupToMatchTable < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :group_id, :integer
  end
end
