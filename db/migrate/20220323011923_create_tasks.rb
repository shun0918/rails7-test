class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.references :status, null: false, foreign_key: { to_table: :taxonomies }
      t.references :user_file, null: true, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
