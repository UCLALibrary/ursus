# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :display_banner?, :sinai_authn_check, :add_legacy_views, :cors_preflight_check
  after_action :cors_set_access_control_headers

  def add_legacy_views
    prepend_view_path "app/views_legacy"
    prepend_view_path "app/views" # already there, but needs to be in front of views_legacy
  end

  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = '*'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  def cors_preflight_check
    return unless request.method == :options

    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Allow-Headers'] = '*'
    headers['Access-Control-Max-Age'] = '1728000'
    render text: '', content_type: 'text/plain'
  end

  def display_banner?
    if banner_cookie?
      @beta_banner_display_option = "none"
    else
      @beta_banner_display_option = "block"
      set_banner_cookie
    end
  end

  def sinai_authn_check
    return true if !Flipflop.sinai? || [login_path, version_path].include?(request.path) || sinai_authenticated?
    if ENV['SINAI_ID_BYPASS'] # skip auth in development
      cookies[:sinai_authenticated] = 'true'
      return true
    end
    check_document_paths
    return unless ucla_token?
    set_auth_cookies
    redirect_to cookies[:requested_path]
  end

  def check_document_paths
    redirect_to redirect_target if params[:id] && [solr_document_path(params[:id])].include?(request.path) # check if someone bookmarked the show page
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
