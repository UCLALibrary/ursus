# frozen_string_literal: true

Flipflop.configure do
  # Strategies will be used in the order listed here.
  strategy :cookie
  strategy :active_record
  strategy :default

  # Other strategies:
  #
  # strategy :sequel
  # strategy :redis
  #
  # strategy :query_string
  # strategy :session
  #
  # strategy :my_strategy do |feature|
  #   # ... your custom code here; return true/false/nil.
  # end

  # Declare your features, e.g:
  #
  # feature :world_domination,
  #   default: true,
  #   description: "Take over the world."

  feature :use_manifest_store,
          default: true,
          description: "Load IIIF manifests from the external manifest-store service when possible."

  feature :sinai,
          default: false,
          description: "Use styling and auth for Sinai Manuscripts site"
end
