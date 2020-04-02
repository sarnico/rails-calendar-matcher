class RenameUserToCreaterInGroups < ActiveRecord::Migration[5.2]
  def change
    rename_column :groups, :user_id, :creater_id
  end
end
