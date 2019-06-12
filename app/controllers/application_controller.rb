# frozen_string_literal: true
class ApplicationController < ActionController::Base
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
