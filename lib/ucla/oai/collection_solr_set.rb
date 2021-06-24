# frozen_string_literal: true
module Ucla
  module Oai
    class CollectionSolrSet < BlacklightOaiProvider::SolrSet
      # OAI Set properties
      attr_accessor :solr_field, :controller

      # Build a set object with, at minimum, a set spec string
      def initialize(spec)
        super(spec)
        config = self.class.field_config_for(label)
        @solr_field = config[:solr_field]
        @description = config[:description]
        raise OAI::ArgumentException if @solr_field.blank?
      end

      def name
        document = self.class.search_service.fetch(@value)
        document[0]["response"]["docs"][0]["title_tesim"][0]
      rescue => e
        "Record not found #{e}"
      end

      def spec
        "#{@label}:#{@value}"
      end

      def solr_filter
        "#{@solr_field}:\"#{@value}\""
      end
    end
  end
end
