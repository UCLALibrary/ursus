# frozen_string_literal: true
module Ursus
  class NoteCollectionMetadataPresenter < BasePresenter
    self.config_file = 'metadata/note_collection_metadata.yml'

    def note_collection_terms
      fields_to_render_by_config_keys
    end
  end
end
