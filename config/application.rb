# frozen_string_literal: true
require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Ursus
  class Application < Rails::Application
    # Before filter for Flipflop dashboard. Replace with a lambda or method name
    # defined in ApplicationController to implement access control.
    config.flipflop.dashboard_access_filter = -> { head :forbidden }

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    config.middleware.insert_before(Rack::Sendfile, Rack::Deflater)
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.max_documents_expiration = 1.day
    config.minimum_average_chunk = 10_000
    config.hashed_id_field = 'hashed_id_ssi'
    config.unique_id_field = 'id'
    config.last_modified_field = 'timestamp'
  end
end
