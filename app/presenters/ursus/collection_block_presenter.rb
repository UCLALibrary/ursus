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
      @collection_document ||= begin
        return unless @response['response']['docs'].first['member_of_collections_ssim']
        collection_id = @response['response']['docs'].first['member_of_collection_ids_ssim'][0]
        SolrDocument.find(collection_id)
      end
    end

    def collection_description
      description = Array.wrap(collection_document['description_tesim'])
      description[0]
    end

    def collection_date_created
      date = Array.wrap(collection_document['date_created_tesim'])
      date[0]
    end

    def collection_repository
      repo = Array.wrap(collection_document['repository_tesim'])
      repo[0]
    end

    def collection_languages
      languages = Array.wrap(collection_document['languages_tesim'])
      languages
    end
  end
end
