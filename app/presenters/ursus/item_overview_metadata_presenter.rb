# frozen_string_literal: true
module Ursus
  class ItemOverviewMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/item_overview_metadata.yml'

    def overview_terms
      fields_to_render_by_config_keys
    end
  end
end
