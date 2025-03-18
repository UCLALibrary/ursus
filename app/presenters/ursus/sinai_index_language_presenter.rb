# frozen_string_literal: true
module Ursus
  class SinaiIndexLanguagePresenter < BaseMetadataPresenter
    self.config_file = 'metadata/sinai_index_language.yml'

    def sinai_index_language_terms
      fields_to_render_by_config_keys
    end
  end
end
