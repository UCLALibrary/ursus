# frozen_string_literal: true
module Ursus
  class TaglineMetadataPresenter < BasePresenter
    self.config_file = 'metadata/tagline_metadata.yml'

    def tagline_terms
      fields_to_render_by_config_keys
    end
  end
end
