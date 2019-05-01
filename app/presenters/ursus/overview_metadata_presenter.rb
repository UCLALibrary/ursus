# frozen_string_literal: true
module Ursus
  class OverviewMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'overview_metadata.yml')))
    end

    def overview_terms
      @document.slice(*@config.keys)
    end
  end
end
