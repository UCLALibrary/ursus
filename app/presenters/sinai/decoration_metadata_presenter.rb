# frozen_string_literal: true
module Sinai
  class DecorationMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/decoration_metadata.yml')))
    end

    def overview_terms
      @document.slice(*@config.keys)
    end
  end
end
