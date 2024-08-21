class ProductionMaterial < ApplicationRecord
  has_many :production_material_type_manifest
  has_many :production_material_type, through: :production_material_type_manifest
end
