# frozen_string_literal: true

module Users
  # Process the requests to recover and update passwords.
  class PasswordsController < Devise::PasswordsController
    clear_respond_to
    respond_to :json
  end
end
