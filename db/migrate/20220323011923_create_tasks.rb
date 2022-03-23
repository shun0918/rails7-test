class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.references :taxonomies, null: false, foreign_key: true
      t.references :user_files, null: false, foreign_key: true

      t.timestamps
    end
  end
end
