class UpdateUserFileIdFromProfileNullTrue < ActiveRecord::Migration[7.0]
  def change
    change_column_null :profiles, :user_file_id, null: true
  end
end
