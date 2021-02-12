# frozen_string_literal: true
module Ursus
  class FindCollectionMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/find_collection_metadata.yml')))
    end

    def find_collection_terms
      @document.slice(*@config.keys)
    end
  end
end
