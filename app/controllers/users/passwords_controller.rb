# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  clear_respond_to
  respond_to :json
end
