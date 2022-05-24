# frozen_string_literal: true

module Users
  # Process the requests to sign in, sign out and show current user.
  class SessionsController < Devise::SessionsController
    before_action :set_csrf_headers, only: %i[show create destroy]

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
end
