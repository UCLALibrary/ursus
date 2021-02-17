# frozen_string_literal: true
module Sinai
  class CodicologyMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/codicology_metadata.yml')))
    end

    def codicology_terms
      @document.slice(*@config.keys)
    end
  end
end
