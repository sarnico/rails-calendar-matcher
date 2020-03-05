class AddUsersGroups < ActiveRecord::Migration[5.2]
  def change
    create_join_table :groups, :users do |t|
      t.references :user, foreign_key: true
      t.references :group, foreign_key: true

      t.timestamps
    end
  end
end
