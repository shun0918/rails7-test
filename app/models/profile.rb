class Profile < ApplicationRecord
  belongs_to :user
  belongs_to :user_file, optional: true

  def avator_url
    p 'avator_url'
    p user_file_id.present?
    user_file_id.present? ? user_file.source_url : nil
  end
end
