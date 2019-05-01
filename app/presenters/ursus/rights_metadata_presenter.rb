# frozen_string_literal: true
module Ursus
  class RightsMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'rights_metadata.yml')))
    end

    def terms
      @document.select { |doc| @config.keys.include?(doc) }.sort_by { |_d| @config.keys }
    end
  end
end
