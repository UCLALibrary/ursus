# frozen_string_literal: true
module Ucla
  module Oai
    class CollectionSolrSet < BlacklightOaiProvider::SolrSet
      def name
        document = self.class.search_service.fetch(@value)
        document[0]["response"]["docs"][0]["title_tesim"][0]
      rescue => e
        "Record not found #{e}"
      end
    end
  end
end
