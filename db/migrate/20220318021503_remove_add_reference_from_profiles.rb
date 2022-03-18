class RemoveAddReferenceFromProfiles < ActiveRecord::Migration[7.0]
  def change
    remove_column :profiles, :add_reference, :string
  end
end
