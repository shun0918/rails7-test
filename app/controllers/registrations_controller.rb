class RegistrationsController < ApplicationController
  protect_from_forgery

  def index
  end

  def show
    @users = User.all
    render json: @users
  end

  def signup
    p params
    @user = User.new(email: params[:email], password: params[:password])

    @user.save
    render json: @user
  end

end
