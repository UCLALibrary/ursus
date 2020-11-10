
module Ucla
  module Oai
    class SolrDocumentWrapper < BlacklightOaiProvider::SolrDocumentWrapper

      def earliest
        builder = search_service.search_builder.merge(fl: solr_timestamp, fq:"has_model_ssim:Work", sort: "#{solr_timestamp} asc", rows: 1)
        response = search_service.repository.search(builder)
        response.documents.first.timestamp
      end

      def latest
        builder = search_service.search_builder.merge(fl: solr_timestamp, fq:"has_model_ssim:Work",sort: "#{solr_timestamp} desc", rows: 1)
        response = search_service.repository.search(builder)
        response.documents.first.timestamp
      end
      
      private

      def conditions(options) # conditions/query derived from options
        super(options).merge(fq:["has_model_ssim:Work"]) {|key, a, b| a + b}
      end

    end
  end
end
