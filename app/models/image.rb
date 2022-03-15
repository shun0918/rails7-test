class Image < ApplicationRecord
  has_one :profile
  validates :path, presence: true, uniqueness: true
end
