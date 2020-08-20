# frozen_string_literal: true
require 'securerandom'

class LoginController < ApplicationController
  before_action :create_token

  def new
    # save in order to allow later verification that the login page was accessed
    if !Flipflop.sinai?
      head :forbidden
    else
      @requested_path = cookies[:request_original_url]
      cookies[:requested_path] = @requested_path
    end
  end

  def create_token
    @token = SecureRandom.uuid
    @login = SinaiToken.create(sinai_token: @token)
    @token_success = "Token created!"
  end
end
