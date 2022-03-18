class AddUserFileIdToProfiles < ActiveRecord::Migration[7.0]
  def change
    add_reference :profiles, :user_file, null: true
  end
end
