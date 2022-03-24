class Task < ApplicationRecord
  belongs_to :status
  belongs_to :user_file, optional: true
  belongs_to :user

  validates :title, presence: true
end
