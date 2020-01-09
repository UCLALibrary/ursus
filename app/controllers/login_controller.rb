# frozen_string_literal: true

require 'securerandom'

class LoginController < ApplicationController
  before_action :create_token

  def new
    @requested_path = params[:callback]
  end

  def create_token
    @token = SecureRandom.uuid
    @login = SinaiToken.create(sinai_token: @token)
    @token_success = "Token created!"
  end
end
