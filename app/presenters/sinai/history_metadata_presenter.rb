# frozen_string_literal: true
module Sinai
  class HistoryMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/history_metadata.yml')))
    end

    def history_terms
      @document.slice(*@config.keys)
    end
  end
end
