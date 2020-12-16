# frozen_string_literal: true

class LogoutController < ApplicationController
  def logout
    # save in order to allow later verification that the login page was accessed
    if !Flipflop.sinai?
      head :forbidden
    else
      cookies.delete :sinai_authenticated, domain: ENV['DOMAIN']
      @requested_path = cookies[:request_original_url]
      redirect_to @requested_path
    end
  end
end
