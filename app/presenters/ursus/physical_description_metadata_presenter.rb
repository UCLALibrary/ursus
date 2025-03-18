# frozen_string_literal: true
module Ursus
  class PhysicalDescriptionMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/physical_description_metadata.yml'

    def physical_description_terms
      fields_to_render_by_config_keys
    end
  end
end
