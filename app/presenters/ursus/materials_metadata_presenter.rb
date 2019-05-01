# frozen_string_literal: true
module Ursus
  class MaterialsMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'materials_metadata.yml')))
    end

    def materials_terms
      @document.slice(*@config.keys)
    end
  end
end
