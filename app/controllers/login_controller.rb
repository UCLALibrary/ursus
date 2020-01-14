# frozen_string_literal: true
require 'securerandom'
require 'uri'

class LoginController < ApplicationController
  before_action :create_token

  def new
    requested_path = params[:callback]
    @encoded_requested_path = URI::encode(requested_path)
  end

  def create_token
    @token = SecureRandom.uuid
    @login = SinaiToken.create(sinai_token: @token)
    @token_success = "Token created!"
  end
end
