# frozen_string_literal: true
# https://github.com/UCLALibrary/ursus/blob/main/spec/helpers/home_page_helper_spec.rb

require 'rails_helper'

RSpec.describe HomePageHelper, type: :helper do
  before { delete_all_documents_from_solr }

  describe '#link_to_featured_work' do
    subject(:link) { helper.link_to_featured_work(link_text, ark) }

    let(:link_text) { 'The text of my link' }
    let(:ark) { '123' }

    context 'when the record doesn\'t exist' do
      it 'returns a link to the search results' do
        expect(link).to include('search_field=all_fields', link_text)
      end
    end

    context 'two records with similar arks' do
      let(:similar_ark) { '456 123' }

      let(:target_record)  { { id: '123', identifier_ssim: [ark] } }
      let(:similar_record) { { id: '456', identifier_ssim: [similar_ark] } }

      let(:expected_link_location) { solr_document_path('123') }

      before do
        solr = Blacklight.default_index.connection
        solr.add([target_record, similar_record])
        solr.commit
      end

      it 'returns the link to the correct record' do
        expect(link).to include(expected_link_location, link_text)
      end
    end
  end
end
