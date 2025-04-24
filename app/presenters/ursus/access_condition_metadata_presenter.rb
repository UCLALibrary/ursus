# frozen_string_literal: true
module Ursus
  class AccessConditionMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/access_condition_metadata.yml'

    def access_condition_terms
      fields_to_render_by_config_keys
    end
  end
end
