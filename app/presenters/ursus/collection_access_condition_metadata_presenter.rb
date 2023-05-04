# frozen_string_literal: true
module Ursus
  class CollectionAccessConditionMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/collections_access_condition_metadata.yml')))
    end

    def collection_access_condition_terms
      @document.slice(*@config.keys)
    end
  end
end
