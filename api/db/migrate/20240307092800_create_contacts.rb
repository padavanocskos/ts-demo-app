# frozen_string_literal: true

# Create table for contacts
class CreateContacts < ActiveRecord::Migration[7.1]
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :email
      t.string :mobile1
      t.string :mobile2
      t.string :phone1
      t.string :phone2
      t.timestamps
    end
  end
end
