class UserFile < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_one_attached :source

  def source_url
    p 'source_url'
    p source.attached?
    source.attached? ? url_for(source) : nil
  end
end
