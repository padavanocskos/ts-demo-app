require 'faker'
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Contacts

100.times do
  Contact.create!(
    {
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      middle_name: Faker::Name.middle_name,
      email: Faker::Internet.email,
      phone1: Faker::PhoneNumber.phone_number,
      phone2: Faker::PhoneNumber.phone_number,
      mobile1: Faker::PhoneNumber.cell_phone,
      mobile2: Faker::PhoneNumber.cell_phone
    }
  )
end
