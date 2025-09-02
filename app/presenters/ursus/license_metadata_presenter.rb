# frozen_string_literal: true
module Ursus
  class LicenseMetadataPresenter < BaseMetadataPresenter
    self.config_file = 'metadata/license_metadata.yml'

    def data
      @config['terms'].find { |row| row['id'] == @document[:license_tesim].first }
    end
  end
end
