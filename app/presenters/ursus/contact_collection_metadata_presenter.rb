# frozen_string_literal: true
module Ursus
  class ContactCollectionMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/contact_collection_metadata.yml')))
    end

    def contact_collection_terms
      @document.slice(*@config.keys)
    end
  end
end
