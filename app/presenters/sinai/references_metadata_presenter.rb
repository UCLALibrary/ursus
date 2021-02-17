# frozen_string_literal: true
module Sinai
  class ReferencesMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/references_metadata.yml')))
    end

    def references_terms
      @document.slice(*@config.keys)
    end
  end
end
