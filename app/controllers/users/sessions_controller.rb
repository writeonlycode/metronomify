# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  before_action :set_csrf_headers, only: [:show, :create, :destroy]

  clear_respond_to
  respond_to :json

  def show
    @user = current_user
    render json: @user
  end

  protected

  def set_csrf_headers
    response.headers['X-CSRF-Param'] = request_forgery_protection_token
    response.headers['X-CSRF-Token'] = form_authenticity_token
  end
end

# class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
# end
