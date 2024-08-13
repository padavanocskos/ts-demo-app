class CreateMillrolls < ActiveRecord::Migration[7.1]
  def change
    create_table :millrolls do |t|
      # foreign keys: user_id, surface_threatment_id, product_id, shift_id
      t.string :thickness
      t.integer :inner_production_number
      t.integer :international_production_number
      t.integer :length
      t.integer :weight
      t.string :sigma_2
      t.text :notice
      t.date :date
      t.time :production_start
      t.time :production_end
      t.timestamps
    end
  end
end