class DropTableGoogleCalendarWrappers < ActiveRecord::Migration[5.2]
  def change
    drop_table :google_calendar_wrappers
  end
end
