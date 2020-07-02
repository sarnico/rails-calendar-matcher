class CreateJctUserMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :jct_user_matches do |t|
      t.references :user, foreign_key: true
      t.references :match, foreign_key: true

      t.timestamps
    end
  end
end
