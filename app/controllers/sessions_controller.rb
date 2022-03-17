class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  skip_before_action :require_sign_in!, only: [:create]
  before_action :set_user, only: [:create]

  def create
    if @user.authenticate(session_params[:password])
      sign_in(@user)
      render json: create_response(res: {success: true})
    else
      flash.now[:danger] = t('.flash.invalid_password')
      render json: create_response(error: {message: 'ログインに失敗しました。'})
    end
  end

  def destroy
    sign_out
    render json: create_response(res: {success: true});
  end

  private

    def set_user
      @user = User.find_by!(email: session_params[:email])
    rescue
      flash.now[:danger] = t('.flash.invalid_mail')
      render json: create_response(error: {message: 'Emailかパスワードが不正です。'});
    end

    # 許可するパラメータ
    def session_params
      params.require(:session).permit(:email, :password)
    end
end
