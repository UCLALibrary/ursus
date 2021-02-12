# frozen_string_literal: true
module Ursus
  class NoteCollectionMetadataPresenter
    attr_reader :document

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', 'metadata/note_collection_metadata.yml')))
    end

    def note_collection_terms
      @document.slice(*@config.keys)
    end
  end
end
