# frozen_string_literal: true
module Ursus
  class SourceItemMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'source_item_metadata.yml')))
    end

    def source_item_terms
      @document.slice(*@config.keys)
    end
  end
end
