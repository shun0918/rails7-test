class Task < ApplicationRecord
  belongs_to :statuses
  belongs_to :user_files
end
