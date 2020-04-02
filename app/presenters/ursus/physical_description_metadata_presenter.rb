# frozen_string_literal: true
module Ursus
  class PhysicalDescriptionMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/physical_description_metadata.yml')))
    end

    def physical_description_terms
      @document.slice(*@config.keys)
    end
  end
end
