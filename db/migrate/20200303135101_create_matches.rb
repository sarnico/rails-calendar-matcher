class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.string :title
      t.text :description
      t.string :location
      t.datetime :match_date
      t.date :min_date
      t.date :max_date
      t.time :min_time
      t.time :max_time
      t.string :state
      t.timestamps
    end
  end
end
