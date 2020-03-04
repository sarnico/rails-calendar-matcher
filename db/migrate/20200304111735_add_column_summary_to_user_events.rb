class AddColumnSummaryToUserEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :user_events, :summary, :text
  end
end
