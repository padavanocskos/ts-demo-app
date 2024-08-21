class CreateProductionMaterials < ActiveRecord::Migration[7.1]
  def change
    create_table :production_materials do |t|
      t.string :name
      t.text :description
      t.string :producer

      t.timestamps
    end
    add_index :production_materials, :name
  end
end
