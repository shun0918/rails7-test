class ProfilesController < ApplicationController
  def create
    if params[:image].present?
      @image = Image.new(path: params[:image])
    end

    # 作成
    if Profile.exists?(user_id: @current_user.id)
      @profile = Profile.update(profile_params(image_id))
    else
      @profile = Profile.new(profile_params(image_id))
    end

    render json: create_response({success: true, profile: @profile})
  end

  private
    def image_id
      @image.presence? @image.id : nil


    def profile_params(image_id: nil)
      params.require(:profile).permit(:name, :bio, :phone, :image).marge(user_id: @current_user.id, image_id:)
    end
end
