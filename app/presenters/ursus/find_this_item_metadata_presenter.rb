# frozen_string_literal: true
module Ursus
  class FindThisItemMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/find_this_item_metadata.yml'

    def find_this_item_terms
      fields_to_render_by_config_keys
    end
  end
end
