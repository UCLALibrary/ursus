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
    return true
    # Checks to see if we are on the Login page and do nothing
    if request.fullpath.include?(login_path)
      @path_check = request.fullpath.include?(login_path)
    else
      # if the cookie named sinai_authenticated already exists
      if sinai_cookie?
        # do nothing
        'sinai_cookie You have a valid cookie that is allowing you to browse the Sinai Digital Library.'
      # elsif the token EMEL sent back is in the database
      elsif ucla_token?
        set_auth_cookie
        set_iv_cookie
        'ucla_token You have a valid cookie that is allowing you to browse the Sinai Digital Library.'
      # else go to the button page
      else
        redirect_to "/login?callback=#{request.original_url}"
      end
    end
  end

  def cookie?
    @banner_cookie = cookies[:banner_display_option]
  end

  def set_banner_cookie
    cookies[:banner_display_option] = "banner_off"
  end

  def sinai_cookie?
    # Does user have the sinai cookie?
    @sinai_cookie = cookies[:sinai_authenticated]
  end

  def ucla_token?
    # Does user have the sinai token in the database?
    params[:token].present? && SinaiToken.find_by(sinai_token: params[:token])
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
