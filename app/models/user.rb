class User < ApplicationRecord
    has_secure_password validations: true

    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }
end
