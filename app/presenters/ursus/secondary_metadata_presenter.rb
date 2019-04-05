# frozen_string_literal: true
module Ursus
  class SecondaryMetadataPresenter
    attr_reader :document, :config

    def initialize(document:, config:)
      @document = document
      @config = config
    end

    def terms
      keys = @config.keys.map(&:to_sym)
      keys.map { |key| @document.slice(key) }
    end
  end
end
