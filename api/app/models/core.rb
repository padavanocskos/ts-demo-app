class Core < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    ["core_number", "created_at", "id", "id_value", "is_faulty", "notice", "updated_at", "weight"]
  end
end
