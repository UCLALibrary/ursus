# frozen_string_literal: true
module Ursus
  class FindThisItemMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/find_this_item_metadata.yml')))
    end

    def find_this_item_terms
      @document.slice(*@config.keys)
    end
  end
end
