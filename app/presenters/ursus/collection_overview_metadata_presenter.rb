# frozen_string_literal: true
module Ursus
  class CollectionOverviewMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/collection_overview_metadata.yml'

    def overview_terms
      fields_to_render_by_config_keys
    end

    def overview_labels
      fields_to_render_by_keys(@config.labels)
    end
  end
end
