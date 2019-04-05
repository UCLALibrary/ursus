# frozen_string_literal: true
module Ursus
  class PrimaryMetadataPresenter
    attr_reader :document, :config

    def initialize(document:, config:)
      @document = document
      @config = config
    end

    def terms
      keys = @config.keys.map(&:to_sym)
      @document.reject { |doc| keys.include?(doc) }
    end
  end
end
