class AddAgeAndBirthdateToContacts < ActiveRecord::Migration[7.1]
  def change
    add_column :contacts, :age, :integer
    add_column :contacts, :birthdate, :date
  end
end
