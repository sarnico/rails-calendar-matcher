class ChangeJctUserMatchName < ActiveRecord::Migration[5.2]
  def change
    create_table :matches_users, id: false do |t|
      t.belongs_to :user
      t.belongs_to :match
    end

    drop_table :jct_user_matches
  end
end
