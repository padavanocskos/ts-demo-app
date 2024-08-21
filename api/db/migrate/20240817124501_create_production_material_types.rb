class CreateProductionMaterialTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :production_material_types do |t|
      t.string :name
      t.string :short
      t.text :description

      t.timestamps
    end
    add_index :production_material_types, :name
    add_index :production_material_types, :short
  end
end
