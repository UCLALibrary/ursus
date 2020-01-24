# frozen_string_literal: true
class ApplicationController < ActionController::Base
  before_action :display_banner?

  def display_banner?
    @path_check = ''
    if cookie?
      @display_option = "none"
    else
      @display_option = "block"
      set_banner_cookie
    end
    if Flipflop.sinai?
      @current_site = "SinaiPOC"
      sinai_authn_check
    else
      @current_site = "UCLA"
    end
  end

  def sinai_authn_check
    # Checks to see if we are on the Login page and, if so, do nothing.
    if request.fullpath.include?(login_path)
      @path_check = request.fullpath.include?(login_path)
    else
      # if the cookie named sinai_authenticated already exists
      if sinai_authenticated?
        # fall through and go to requested page
        'sinai_authenticated You have a valid cookie that is allowing you to browse the Sinai Digital Library.'
      # else is the token EMEL sent back in the database
      elsif ucla_token?
        set_auth_cookie
        set_iv_cookie
        redirect_to cookies[:requested_path]
        'ucla_token You have a valid cookie that is allowing you to browse the Sinai Digital Library.'
      # else go to the login button page or Authn error page (on injected token)
      else
        redirect_to @redirect_target
      end
    end
  end

  def cookie?
    @banner_cookie = cookies[:banner_display_option]
  end

  def set_banner_cookie
    cookies[:banner_display_option] = "banner_off"
  end

  def sinai_authenticated?
    # Does user have the sinai cookie?
    @sinai_authenticated = cookies[:sinai_authenticated]
  end

  def ucla_token?
    # default target if user is not logged in
    @redirect_target = "/login?callback=#{request.original_url}"
    # does the request have a querystring containing a param named token and, if so, was it previously written to the database?
    return true if params[:token].present? && SinaiToken.find_by(sinai_token: params[:token])
    # does the request have a querystring containing the character "?token=" and, if so, extract the token
    return false unless request.fullpath.include?("?token=")
    returned_token_array = request.fullpath.split(/\?token=/)
    @returned_token = returned_token_array[1]
    # is the extracted token in the database and did the user pass through the login page?
    return true if SinaiToken.find_by(sinai_token: @returned_token) && cookies[:requested_path]
    # set redirect if injected token is not in the database
    @redirect_target = "#{root_url}auth_error"
    # set return to false so that setting of the set_auth_cookie and set_iv_cookie is skipped if the token is invalid
    return_false
  end

  def set_session_cookie
    session[:sinai_authenticated_test] = "authenticated"
  end

  def set_auth_cookie
    @encryptd_str = create_encrypted_string
    cookies[:sinai_authenticated] = {
      value: @cipher_text_unpacked,
      expires: Time.zone.now + 90.days,
      domain: ENV['DOMAIN']
    }
  end

  def set_iv_cookie
    @iv_unpacked = @iv.unpack('H*')[0].upcase
    cookies[:initialization_vector] = {
      value: @iv_unpacked,
      expires: Time.zone.now + 90.days,
      domain: ENV['DOMAIN']
    }
  end

  def create_encrypted_string
    todays_date = Time.zone.today
    cipher = OpenSSL::Cipher::AES256.new :CBC
    cipher.encrypt
    @iv = cipher.random_iv
    cipher.key = ENV['CIPHER_KEY']
    cipher.iv = @iv
    @cipher_text_packed = cipher.update("Authenticated #{todays_date}") + cipher.final
    @cipher_text_unpacked = @cipher_text_packed.unpack('H*')[0].upcase
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
end
