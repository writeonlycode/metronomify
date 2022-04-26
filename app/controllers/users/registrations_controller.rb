# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  clear_respond_to
  respond_to :json
end
