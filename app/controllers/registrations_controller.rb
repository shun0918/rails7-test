class RegistrationsController < ApplicationController
  def index
  end

  def show
    users = { id: 1, name: "shun", password: "hogehoge" }
    render json: users
  end

end
