# frozen_string_literal: true
module Ursus
  class SinaiIndexDatePresenter < BaseMetadataPresenter
    self.config_file = 'metadata/sinai_index_date.yml'

    def sinai_index_date_terms
      fields_to_render_by_config_keys
    end
  end
end
