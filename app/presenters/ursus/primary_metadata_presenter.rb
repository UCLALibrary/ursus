# frozen_string_literal: true
module Ursus
  class PrimaryMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'secondary_metadata.yml')))
    end

    def terms
      @document.reject { |doc| @config.keys.include?(doc) }
    end
  end
end
