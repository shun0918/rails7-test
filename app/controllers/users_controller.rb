class UsersController < ApplicationController
  def index
  end

  def me
    @profile = Profile.find_by(user_id: @current_user.id)
    render json: { user: @current_user, profile: @profile, avator: {url: @profile.avator_url}}
  end

  def update
    @profile = Profile.find_by(user_id: @current_user.id)
    if @profile.nil?
      @profile = Profile.new(profile_params)
    else
      update_profile_params
    end

    # user_file更新
    if params[:user_file].present?
      p 'file exists!!!!!!!'
      if @profile.user_file_id.present?
        @user_file = UserFile.find_by(id: @profile.user_file_id)
        @user_file.update(user_file_params)
      else
        @user_file = UserFile.new(user_file_params)
        @user_file.save
        @profile.user_file_id = profile_params[:user_file_id]
      end
    end

    @current_user.update(user_params)
    @profile.save
  end

  private
    def update_profile_params
      params[:profile].each_key do |key|
        @profile[key] = profile_params[key]
      end
    end

    def user_params
      params.require(:user).permit(:email, :password)
    end

    def profile_params
      params.require(:profile).permit(:name, :bio, :phone).merge(user_id: @current_user.id, user_file_id: @user_file.present? ? @user_file.id : nil)
    end

    def user_file_params
      params.require(:user_file).permit(:source).merge(user_id: @current_user.id)
    end
end
