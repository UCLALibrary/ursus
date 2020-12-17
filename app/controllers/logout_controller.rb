# frozen_string_literal: true

class LogoutController < ApplicationController
  def logout
    # save in order to allow later verification that the login page was accessed
    if !Flipflop.sinai?
      head :forbidden
    else
      cookies.delete :sinai_authenticated, domain: ENV['DOMAIN']
      cookies.delete :initialization_vector, domain: ENV['DOMAIN']
      @requested_path = cookies[:request_original_url]
      cookies.delete :request_original_url
      response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
      response.headers["Pragma"] = "no-cache"
      response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
      redirect_to @requested_path
    end
  end
end
