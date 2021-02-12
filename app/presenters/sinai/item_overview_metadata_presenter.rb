# frozen_string_literal: true
module Ursus
  class ItemOverviewMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/item_overview_metadata.yml')))
    end

    def overview_terms
      @document.slice(*@config.keys)
    end
  end
end
