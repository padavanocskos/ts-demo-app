class Contact < ApplicationRecord
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "email", "first_name", "id", "id_value", "last_name", "middle_name", "mobile1", "mobile2", "phone1", "phone2", "updated_at"]
  end
end
