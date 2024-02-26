class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  scope :order_by, ->(field, direction) { order(field, direction) }

  def self.filter_by(field_name, condition, value = '')
    where("#{field_name} #{condition} '#{value}'")
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
