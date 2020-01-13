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

      # Checks to see if we are on the Login page and do nothing
      if request.fullpath.include?(login_path)
        @path_check = request.fullpath.include?(login_path)
      else
        if has_sinai_cookie?
          # do nothing
          'has_sinai_cookie You have a valid cookie that is allowing you to browse the Sinai Digital Library.'
        elsif has_token?
          # user has a token so we then need to set the cookie based on the fact that they have a token in the database
          set_auth_cookie
          set_iv_cookie
          'has_token You have a valid cookie that is allowing you to browse the Sinai Digital Library.'
        else
          redirect_to "/login?callback=#{request.original_url}"
        end
      end
    else
      @current_site = "UCLA"
    end
  end

  def cookie?
    @has_cookie = cookies[:banner_display_option]
  end

  def set_banner_cookie
    cookies[:banner_display_option] = "banner_off"
  end

  def has_sinai_cookie?
    # Does user have the sinai cookie?
    @has_sinai_cookie = cookies[:sinai_authenticated]
  end

  def has_token?
    # Does user have the sinai token in the database?
    params[:token].present? && SinaiToken.find_by(sinai_token: params[:token])
  end

  def set_session_cookie
    session[:sinai_authenticated_test] = "authenticated"
  end

  def set_auth_cookie
    @encryptd_str = create_encrypted_string
    cookies[:sinai_authenticated] = {
      value: @cipher_text_unPacked,
      expires: Time.now + 90.days,
      domain: ENV['DOMAIN']
    }
  end

  def set_iv_cookie
    @iv_unPacked = @iv.unpack('H*')[0].upcase
    cookies[:initialization_vector] = {
      value: @iv_unPacked,
      expires: Time.now + 90.days,
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
    @cipher_text_unPacked = @cipher_text_packed.unpack('H*')[0].upcase
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
