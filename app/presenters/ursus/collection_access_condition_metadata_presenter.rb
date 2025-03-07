# frozen_string_literal: true
module Ursus
  class CollectionAccessConditionMetadataPresenter < BasePresenter
    self.config_file = 'metadata/collection_access_condition_metadata.yml'

    def collection_access_condition_terms
      fields_to_render_by_config_keys
    end
  end
end
