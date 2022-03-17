class RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :require_sign_in!, only: [:index, :create, :hoge]
  before_action :require_unlogin!, only: [:index]

  def index
  end

  def create
    @user = User.new(user_params)
    @user.save

    sign_in(@user)

    render json: create_response(res: { user: @user })
  end

  private
    def user_params
      params.require(:user).permit(:email, :password)
    end
end
