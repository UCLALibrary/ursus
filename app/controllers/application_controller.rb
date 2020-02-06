# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :display_banner?, :sinai_authn_check

  def display_banner?
    if banner_cookie?
      @beta_banner_display_option = "none"
    else
      @beta_banner_display_option = "block"
      set_banner_cookie
    end
  end

  def sinai_authn_check
    return true if ENV['SINAI_ID_BYPASS'] # skip auth in development
    return true if !Flipflop.sinai? || [login_path, version_path].include?(request.path) || sinai_authenticated?
    if ucla_token?
      set_auth_cookies
      redirect_to cookies[:requested_path]
    else
      redirect_to redirect_target
    end
  end

  def banner_cookie?
    cookies[:banner_display_option]
  end

  def set_banner_cookie
    cookies[:banner_display_option] = "banner_off"
  end

  def sinai_authenticated?
    cookies[:sinai_authenticated]
  end

  def ucla_token?
    # does the request have a querystring containing a param named token and, if so, was it previously written to the database?
    return true if params[:token].present? && SinaiToken.find_by(sinai_token: params[:token])
    # does the request have a querystring containing the character "?token=" and, if so, extract the token
    return false unless request.fullpath.include?("?token=")
    returned_token_array = request.fullpath.split(/\?token=/)
    returned_token = returned_token_array[1]
    # is the extracted token in the database and did the user pass through the login page?
    return true if SinaiToken.find_by(sinai_token: returned_token) && cookies[:requested_path]

    false
  end

  def set_auth_cookies
    cookies[:sinai_authenticated] = {
      value: create_encrypted_string.unpack('H*')[0].upcase,
      expires: Time.zone.now + 25.years,
      domain: ENV['DOMAIN']
    }
    cookies[:initialization_vector] = {
      value: cipher_iv.unpack('H*')[0].upcase,
      expires: Time.zone.now + 25.years,
      domain: ENV['DOMAIN']
    }
  end

  def create_encrypted_string
    cipher.encrypt
    cipher.key = ENV['CIPHER_KEY']
    cipher.iv = cipher_iv
    cipher.update("Authenticated #{Time.zone.today}") + cipher.final
  end

  helper Openseadragon::OpenseadragonHelper
  # Adds a few additional behaviors into the application controller
  include Blacklight::Controller
  layout 'blacklight'

  protect_from_forgery with: :exception

  rescue_from Blacklight::AccessControls::AccessDenied, with: :render_404

  def render_404
    render file: Rails.root.join('public', '404.html'), status: :not_found, layout: false
  end

  private

    def cipher
      @cipher ||= OpenSSL::Cipher::AES256.new :CBC
    end

    def cipher_iv
      @iv ||= cipher.random_iv
    end

    def redirect_target
      cookies[:request_original_url] = request.original_url
      "/login"
    end
end
