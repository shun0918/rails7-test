class UsersController < ApplicationController
  def index
  end

  def me
    @profile = Profile.find_by(user_id: @current_user.id)
    render json: { user: @current_user, profile: @profile, avator: {url: @profile.avator_url}}
  end
end
