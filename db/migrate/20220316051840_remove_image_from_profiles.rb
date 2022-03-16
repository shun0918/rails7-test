class RemoveImageFromProfiles < ActiveRecord::Migration[7.0]
  def change
    remove_column :profiles, :image_id, :bigint
  end
end
