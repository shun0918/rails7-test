class Task < ApplicationRecord
  belongs_to :taxonomy
  belongs_to :user_file, optional: true
  belongs_to :user
end
