# frozen_string_literal: true
module Ursus
  class AccessConditionMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = if Flipflop.sinai?
                  YAML.safe_load(File.open(Rails.root.join('config', 'metadata/access_condition_metadata_sinai.yml')))
                else
                  YAML.safe_load(File.open(Rails.root.join('config', 'metadata/access_condition_metadata.yml')))
                end
    end

    def access_condition_terms
      @document.select { |doc| @config.keys.include?(doc) }.sort_by { |_d| @config.keys }
    end
  end
end
