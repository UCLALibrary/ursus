# frozen_string_literal: true
module Ursus
  class SubjectMetadataPresenter
    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'subject_metadata.yml')))
    end

    def subject_terms
      @document.slice(*@config.keys)
    end
  end
end
