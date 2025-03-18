# frozen_string_literal: true
module Ursus
  class NoteMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/note_metadata.yml'

    def note_terms
      fields_to_render_by_config_keys
    end
  end
end
