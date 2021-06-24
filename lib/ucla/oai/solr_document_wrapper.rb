# frozen_string_literal: true
module Ucla
  module Oai
    class SolrDocumentWrapper < BlacklightOaiProvider::SolrDocumentWrapper
      def earliest
        builder = search_service.search_builder.merge(fl: solr_timestamp, fq: "has_model_ssim:Work", sort: "#{solr_timestamp} asc", rows: 1)
        response = search_service.repository.search(builder)
        response.documents.first.timestamp
      end

      def latest
        builder = search_service.search_builder.merge(fl: solr_timestamp, fq: "has_model_ssim:Work", sort: "#{solr_timestamp} desc", rows: 1)
        response = search_service.repository.search(builder)
        response.documents.first.timestamp
      end

      def find(selector, options = {})
        return next_set(options[:resumption_token]) if options[:resumption_token]
        
        if selector == :all
          byebug
          super(selector, options)
        else
          super(selector.sub(/^ark\:\/+/, '').sub('/', '-').reverse, options)
        end
      end

      private

        def conditions(options) # conditions/query derived from options
          byebug
          super(options).merge(fq: ["has_model_ssim:Work"]) { |_key, a, b| a + b }
          byebug
        end
    end
  end
end
