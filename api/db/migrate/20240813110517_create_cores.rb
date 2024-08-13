class CreateCores < ActiveRecord::Migration[7.1]
  def change
    create_table :cores do |t|
      t.integer :core_number
      t.integer :weight
      t.boolean :is_faulty
      t.text :notice

      t.timestamps
    end
  end
end
