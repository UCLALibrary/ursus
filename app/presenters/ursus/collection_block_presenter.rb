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
      @response['response']['docs'].first['member_of_collections_ssim'][0]
    end

    def service_contact
      return unless @response['response']['docs'].first['member_of_collections_ssim']
      collection_id = @response['response']['docs'].first['member_of_collection_ids_ssim'][0]
      SolrDocument.find(collection_id)[:services_contact_ssm][0]
    end

    # returns #<SolrDocument:0x00007ff9fdf943f0>
    def collection_document
      return unless @response['response']['docs'].first['member_of_collections_ssim']
      collection_id = @response['response']['docs'].first['member_of_collection_ids_ssim'][0]
      SolrDocument.find(collection_id)
    end

    def collection_description
      description = collection_document['description_tesim']
      description[0]
    end

    def collection_date_created
      date = collection_document['date_created_tesim']
      date[0]
    end

    def collection_repository
      repo = collection_document['repository_tesim']
      repo[0]
    end

    def collection_languages
      languages = collection_document['languages_tesim']
      languages
    end
  end
end
