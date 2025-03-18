# frozen_string_literal: true
module Ursus
  class KeywordMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/keyword_metadata.yml'

    def keyword_terms
      fields_to_render_by_config_keys
    end
  end
end
