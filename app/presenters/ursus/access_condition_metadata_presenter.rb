# frozen_string_literal: true
module Ursus
  class AccessConditionMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/access_condition_metadata.yml')))
    end

    def access_condition_terms
      @document.slice(*@config.keys)
    end
  end
end
