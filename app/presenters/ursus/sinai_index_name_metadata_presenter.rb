# frozen_string_literal: true
module Ursus
  class SinaiIndexNameMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/sinai_index_name_metadata.yml')))
    end

    def sinai_index_name_terms
      @document.slice(*@config.keys)
    end

    def sinai_index_name_values
      @document
    end

    def sinai_index_name_keys
      @config.keys
    end
  end
end
