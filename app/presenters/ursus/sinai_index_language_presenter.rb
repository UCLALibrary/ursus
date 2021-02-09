# frozen_string_literal: true
module Ursus
  class SinaiIndexLanguagePresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/sinai_index_language.yml')))
    end

    def sinai_index_language_terms
      @document.slice(*@config.keys)
    end
  end
end
