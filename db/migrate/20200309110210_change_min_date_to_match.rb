class ChangeMinDateToMatch < ActiveRecord::Migration[5.2]
  def change
    change_column_default :matches, :min_date, nil
  end
end
