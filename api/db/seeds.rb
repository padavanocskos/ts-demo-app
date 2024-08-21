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

60.times do |i|
  Core.create!(
    {
      core_number: i + 1,
      weight: Faker::Number.between(from: 1950, to: 2235),
      is_faulty: Faker::Boolean.boolean(true_ratio: 0.2),
      notice: Faker::Lorem.sentences.join(' '),
    }
  )
end

product_names = [:tnk, :xrdh, :xtmu, :tns, :tls, :mus, :lit, :vbes, :xtmh, :ltn]

product_names.each do |product_name|
  ProductType.create!(
    name: product_name.upcase,
    description: Faker::Lorem.sentences.join(' ')
  )
end

prod_material_types = [
  {
    name: "POLYPROPILENE",
    short: "PP",
    description: Faker::Lorem.sentences.join(' '),
  },
  {
    name: "HOMOPOLYMER",
    short: "HP",
    description: Faker::Lorem.sentences.join(' '),
  },
  {
    name: "TERPOLYMER",
    short: "TP",
    description: Faker::Lorem.sentences.join(' '),
  },
    {
    name: "ADHESIVE",
    short: "AD",
    description: Faker::Lorem.sentences.join(' '),
  },
  {
    name: "ANTIBLOCKING",
    short: "AB",
    description: Faker::Lorem.sentences.join(' '),
  },
  {
    name: "FOAMING",
    short: "FO",
    description: Faker::Lorem.sentences.join(' '),
  },
  {
    name: "SLIP",
    short: "SL",
    description: Faker::Lorem.sentences.join(' ')
  }
]

prod_material_types.each do |type|
  ProductionMaterialType.create!(
    name: type[:name],
    short: type[:short],
    description: type[:description],
  )
end

prod_materials = [
  h649 = {
    name: 'H649FH',
    producer: 'MOL Petrolkemia Zrt.',
    description: Faker::Lorem.sentences.join(' '),
  },
  hp525j = {
    name: 'HP525J',
    producer: 'MOL Petrolkemia Zrt.',
    description: Faker::Lorem.sentences.join(' '),
  },
  at1179e = {
    name: 'AT1179E',
    producer: 'Mitsui Chemicals Europe GmbH',
    description: Faker::Lorem.sentences.join(' '),
  },
  at3355e = {
    name: 'AT3355E',
    producer: 'Mitsui Chemicals Europe GmbH',
    description: Faker::Lorem.sentences.join(' '),
  },
  adsyl5c33f = {
    name: 'ADSYL 5C 33F',
    producer: 'LiondellBasel',
    description: Faker::Lorem.sentences.join(' '),
  },
  adsyl5c99f = {
    name: 'ADSYL 5C 99F',
    producer: 'LyondellBasel',
    description: Faker::Lorem.sentences.join(' '),
  },
  c470 = {
    name: 'C470',
    producer: 'Tosaf',
    description: Faker::Lorem.sentences.join(' '),
  },
  abo50vcp = {
    name: 'ABO50VCP',
    producer: 'Edhaf',
    description: Faker::Lorem.sentences.join(' '),
  },
  abo60vcp = {
    name: 'ABO60VCP',
    producer: 'Edhaf',
    description: Faker::Lorem.sentences.join(' '),
  },
  conslip440ppr = {
    name: 'CONSLIP440PPR',
    producer: 'Constab',
    description: Faker::Lorem.sentences.join(' ')
  }
]

prod_materials.each do |material|
  ProductionMaterial.create!(
    name: material[:name],
    producer: material[:producer],
    description: material[:description],
  )
end

prod_material_types = [
  # HP525J add to PP and HP type
  {
    production_material_id: 2,
    production_material_type_id: 1,
  },
  {
    production_material_id: 2,
    production_material_type_id: 2,
  },
]

prod_material_types.each do |type|
  ProductionMaterialTypeManifest.create!(
    production_material_id: type[:production_material_id],
    production_material_type_id: type[:production_material_type_id]
  )
end