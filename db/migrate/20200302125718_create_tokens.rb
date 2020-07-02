class CreateTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :tokens do |t|
      t.references :user, foreign_key: true
      t.string :access_token
      t.string :refresh_token
      t.integer :expires_at
      t.string :provider

      t.timestamps
    end
  end
end
