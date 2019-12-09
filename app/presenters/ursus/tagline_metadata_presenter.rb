# frozen_string_literal: true
module Ursus
  class TaglineMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/tagline_metadata.yml')))
    end

    def tagline_terms
      @document.slice(*@config.keys)
    end
  end
end
