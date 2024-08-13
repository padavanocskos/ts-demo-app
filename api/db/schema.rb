# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_13_114616) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contacts", force: :cascade do |t|
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.string "email"
    t.string "mobile1"
    t.string "mobile2"
    t.string "phone1"
    t.string "phone2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cores", force: :cascade do |t|
    t.integer "core_number"
    t.integer "weight"
    t.boolean "is_faulty"
    t.text "notice"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "millrolls", force: :cascade do |t|
    t.string "thickness"
    t.integer "inner_production_number"
    t.integer "international_production_number"
    t.integer "length"
    t.integer "weight"
    t.string "sigma_2"
    t.text "notice"
    t.date "date"
    t.time "production_start"
    t.time "production_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "core_id", null: false
    t.index ["core_id"], name: "index_millrolls_on_core_id"
  end

  add_foreign_key "millrolls", "cores"
end
