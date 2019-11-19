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
  end

  def cookie?
    @has_cookie = cookies[:banner_display_option]
  end

  def set_banner_cookie
    cookies[:banner_display_option] = "banner_off"
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
