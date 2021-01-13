# frozen_string_literal: true
module Ursus
  class SinaiIndexHeaderMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/sinai_index_header_metadata.yml')))
    end

    def sinai_index_header_terms
      @document.slice(*@config.keys)
    end
  end
end
