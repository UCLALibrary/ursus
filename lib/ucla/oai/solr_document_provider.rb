require 'ucla/oai/solr_document_wrapper'
# frozen_string_literal: true
module Ucla
  module Oai
    class SolrDocumentProvider < BlacklightOaiProvider::SolrDocumentProvider
      SolrDocumentProvider.register_format(Ucla::Oai::Metadata::Dpla.instance)

      def initialize(controller, options = {})
        super(controller, options)
        self.class.model = Ucla::Oai::SolrDocumentWrapper.new(controller, options[:document])
      end
    end
  end
end
