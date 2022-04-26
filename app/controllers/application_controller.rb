class ApplicationController < ActionController::Base
  before_action :throttle

  def throttle
    sleep 5
  end
end
