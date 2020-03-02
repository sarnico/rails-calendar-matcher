class CreateGoogleCalendarWrappers < ActiveRecord::Migration[5.2]
  def change
    create_table :google_calendar_wrappers do |t|

      t.timestamps
    end
  end
end
