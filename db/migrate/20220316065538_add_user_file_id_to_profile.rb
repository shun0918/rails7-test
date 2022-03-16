class AddUserFileIdToProfile < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :add_reference, :string
    add_reference :profiles, :user_file, null: false, foreign_key: true
  end
end
