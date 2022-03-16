class ProfilesController < ApplicationController

  def update

    @user_file = UserFile.find_by(user_id: @current_user.id)
    if params[:source].present?
      p 'source exists!'
      if @user_file.present?
        @user_file.update(user_file_params)
      else
        @user_file = UserFile.new(user_file_params)
        @user_file.save
      end
    end

    # 作成
    @profile = Profile.find_by(user_id: @current_user.id)
    if @profile.present?
      p 'exists!'
      @profile.update(profile_params)
    else
      p 'new!'
      @profile = Profile.new(profile_params)
      @profile.save
    end

    render json: create_response(res: {success: true, profile: @profile})
  end

  private
    def profile_params
      params.require(:profile).permit(:name, :bio, :phone).merge(user_id: @current_user.id, user_file_id: @user_file.present? ? @user_file.id : nil)
    end

    def user_file_params
      params.require(:user_file).permit(:source).merge(user_id: @current_user.id)
    end
end
