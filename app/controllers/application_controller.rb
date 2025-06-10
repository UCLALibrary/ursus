# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :add_legacy_views, :cors_preflight_check
  after_action :cors_set_access_control_headers
  helper_method :solr_document_path, :solr_document_url

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

  # def display_banner?
  #   if banner_cookie?
  #     @beta_banner_display_option = "none"
  #   else
  #     set_banner_cookie
  #   end
  # end

  # def banner_cookie?
  #   cookies[:banner_display_option]
  # end

  # def set_banner_cookie
  #   cookies[:banner_display_option] = "banner_off"
  # end

  # Adds a few additional behaviors into the application controller
  include Blacklight::Controller
  layout 'blacklight'

  protect_from_forgery with: :exception

  rescue_from Blacklight::AccessControls::AccessDenied, with: :render_404
  rescue_from Blacklight::Exceptions::RecordNotFound, with: :render_404

  def render_404
    render 'errors/not_found'
  end

  def solr_document_path(*args)
    ark = case args[0]
          when nil
            params[:id]
          when SolrDocument
            args[0].id
          when String
            args[0]
          else
            raise ArgumentError, 'Argument must be a SolrDocument with an ARK, or a string containing a SolrDocument ARK'
          end
    "/catalog/#{CGI.unescape(ark.to_s)}"
  end

  def solr_document_url(*args)
    request.scheme + '://' + request.host_with_port + solr_document_path(*args)
  end
end
