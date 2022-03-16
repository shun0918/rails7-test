class Profile < ApplicationRecord
  belongs_to :user
  belongs_to :user_file, optional: true
end
