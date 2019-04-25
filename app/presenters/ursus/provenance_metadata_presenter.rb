# frozen_string_literal: true
module Ursus
  class ProvenanceMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'provenance_metadata.yml')))
    end

    def provenance_terms
      @document.slice(*@config.keys)
    end
  end
end
