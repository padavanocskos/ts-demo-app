class AddCoreRefToMillrolls < ActiveRecord::Migration[7.1]
  def change
    add_reference :millrolls, :core, null: false, foreign_key: true
  end
end
