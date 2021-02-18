# frozen_string_literal: true
module Sinai
  class KeywordsMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/keywords_metadata.yml')))
    end

    def keywords_terms
      @document.slice(*@config.keys)
    end
  end
end
