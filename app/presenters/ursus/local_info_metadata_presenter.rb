# frozen_string_literal: true
module Ursus
  class LocalInfoMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/local_info_metadata.yml')))
    end

    def local_info_terms
      @document.slice(*@config.keys)
    end
  end
end
