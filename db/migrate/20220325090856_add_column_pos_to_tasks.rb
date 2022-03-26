class AddColumnPosToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :pos, :float
  end
end
