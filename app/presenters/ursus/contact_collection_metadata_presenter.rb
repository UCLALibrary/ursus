# frozen_string_literal: true
module Ursus
  class ContactCollectionMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/contact_collection_metadata.yml'

    def contact_collection_terms
      fields_to_render_by_config_keys
    end
  end
end
