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
  end
end
