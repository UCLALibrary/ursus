# frozen_string_literal: true
module Ursus
  class BasePresenter
    class << self
      attr_accessor :config_file
    end

    attr_reader :document, :config

    def initialize(document:)
      @document = document
      @config = YAML.safe_load(File.open(Rails.root.join('config', self.class.config_file)))
    end

    def fields_to_render_by_config_keys
      fields_to_render_by_keys(@config.keys)
    end

    def fields_to_render_by_keys(keys)
      result = {}
      @document.fields_to_render do |field_name, field_config|
        result[field_name] = field_config if keys.include?(field_name)
      end

      Rails.logger.debug '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
      Rails.logger.debug '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
      Rails.logger.debug '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
      Rails.logger.debug '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
      Rails.logger.debug '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
      Rails.logger.debug result

      result
    end

    def old_fields_to_render
      @document.send(:fields).select do |_name, field_config|
        # rubocop:disable Style/PreferredHashMethods
        @document.send(:render_field?, field_config) && @document.send(:has_value?, field_config)
        # rubocop:enable Style/PreferredHashMethods
      end
    end
  end
end
