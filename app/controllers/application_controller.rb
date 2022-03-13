class ApplicationController < ActionController::Base

  before_action :current_user
  before_action :require_sign_in!
  helper_method :signed_in?
  protect_from_forgery with: :null_session

  def current_user
    remember_token = User.encrypt(cookies[:user_remember_token])
    @current_user ||= User.find_by(remember_token: remember_token)
  end

  def sign_in(user)
    remember_token = User.new_remember_token
    cookies.permanent[:user_remember_token] = { value: remember_token, expires: 1.hour.from_now}
    user.update!(remember_token: User.encrypt(remember_token))
    @current_user = user
  end

  def sign_out
    @current_user = nil
    cookies.delete(:user_remember_token)
  end

  def create_response(res: nil, error: nil)
    if error.presence
        { errors: error }
    else
        { data: res }
    end
  end

  def signed_in?
    @current_user.present?
  end

  private

    def require_sign_in!
      redirect_to root_path unless signed_in?
    end
end
