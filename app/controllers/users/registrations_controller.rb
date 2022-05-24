# frozen_string_literal: true

module Users
  # Process the requests to sign up, update, delete and cancel registrations.
  class RegistrationsController < Devise::RegistrationsController
    clear_respond_to
    respond_to :json
  end
end
