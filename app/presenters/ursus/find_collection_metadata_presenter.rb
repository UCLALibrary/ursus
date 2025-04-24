# frozen_string_literal: true
module Ursus
  class FindCollectionMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/find_collection_metadata.yml'

    def find_collection_terms
      fields_to_render_by_config_keys
    end
  end
end
