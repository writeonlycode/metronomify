# frozen_string_literal: true

# Serves as base for the other controllers.
class ApplicationController < ActionController::Base
  # before_action :throttle
  # after_action :flash_to_http_header

  private

  def flash_to_http_header
    return if flash.empty?

    response.headers['X-Flash-Messages'] = flash.to_hash.to_json
    flash.discard
  end

  def throttle
    sleep 5
  end
end
