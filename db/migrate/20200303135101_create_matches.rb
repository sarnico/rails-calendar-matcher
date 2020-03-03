class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.string :title
      t.text :description
      t.string :location
      t.datetime :match_date
      t.datetime :min_date
      t.datetime :max_date
      t.string :state

      t.timestamps
    end
  end
end
