class User < ApplicationRecord
  has_secure_password validations: true

  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  def self.new_remember_token
      SecureRandom.urlsafe_base64
  end

  def self.encrypt(token)
      Digest::SHA256.hexdigest(token.to_s)
  end

  def create_session
    if @user.authenticate(session_params[:password])
        sign_in(@user)
        true
    else
        flash.now[:danger] = t('.flash.invalid_password')
        create_response(error: {message: 'ログインに失敗しました。'})
    end
  end
end
