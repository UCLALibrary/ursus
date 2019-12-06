# frozen_string_literal: true
module Ursus
  class CollectionOverviewMetadataPresenter
    attr_reader :document, :config
    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/collection_overview_metadata.yml')))
    end

    def overview_terms
      @document.slice(*@config.keys)
    end

    def overview_labels
      @document.slice(*@config.values)
    end
  end
end
