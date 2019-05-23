# frozen_string_literal: true
module Ursus
  class KeywordMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/keyword_metadata.yml')))
    end

    def keyword_terms
      @document.slice(*@config.keys)
    end
  end
end
