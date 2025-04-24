# frozen_string_literal: true
module Ursus
  class SinaiIndexTitleMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/sinai_index_title_metadata.yml'

    def sinai_index_title_terms
      fields_to_render_by_config_keys
    end
  end
end
