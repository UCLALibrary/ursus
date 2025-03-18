# frozen_string_literal: true
module Ursus
  class SinaiIndexNameMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/sinai_index_name_metadata.yml'

    def sinai_index_name_terms
      fields_to_render_by_config_keys
    end
  end
end
