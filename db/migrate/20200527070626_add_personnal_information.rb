class AddPersonnalInformation < ActiveRecord::Migration[5.2]
  def change
        add_column :users, :name, :string
        add_column :users, :last_name, :string
        add_column :users, :birthdate, :date
        add_column :users, :phone_number, :string
        add_column :users, :country, :string
        add_column :users, :city, :string
  end
end
