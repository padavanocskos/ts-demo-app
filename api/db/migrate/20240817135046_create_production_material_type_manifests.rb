class CreateProductionMaterialTypeManifests < ActiveRecord::Migration[7.1]
  def change
    create_table :production_material_type_manifests do |t|
      t.references :production_material, null: false, foreign_key: true
      t.references :production_material_type, null: false, foreign_key: true

      t.timestamps
    end
  end
end
