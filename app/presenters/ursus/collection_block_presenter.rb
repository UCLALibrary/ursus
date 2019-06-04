# frozen_string_literal: true
module Ursus
  class CollectionBlockPresenter
    def initialize(response:)
      @response = response
    end

    def collection_selected?
      @response['responseHeader']['params']['fq'][1].match?(/member_of_collections/)
    end

    def collection_name
      return unless @response['response']['docs'].first['member_of_collections_ssim']
      @response['response']['docs'].first['member_of_collections_ssim'][0]
    end

    def service_contact
      return unless @response['response']['docs'].first['member_of_collections_ssim']
      return unless @response['response']['docs'].first['member_of_collections_ssim'][0]
      collection_id = @response['response']['docs'].first['member_of_collection_ids_ssim'][0]
      collection_doc = SolrDocument.find(collection_id)
      return 'No contact information recorded' unless collection_doc[:services_contact_ssm]
      collection_doc[:services_contact_ssm][0]
    end

    def collection_document
      return unless @response['response']['docs'].first['member_of_collections_ssim']
      collection_id = @response['response']['docs'].first['member_of_collection_ids_ssim'][0]
      SolrDocument.find(collection_id)
    end
  end
end
