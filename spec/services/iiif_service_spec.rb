# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IiifService do
  let(:id) { 'abc123' }
  let(:ark) { 'ark:/123/not_the_id' }
  let(:service) { described_class.new }
  let(:solr_document) do
    SolrDocument.new(id: id,
                     ark: ark,
                     iiif_manifest_url_ssi: 'https://manifest.store/ark%3A%2Fabc%2F123/manifest')
  end
  let(:iiif_manifest_url) { service.iiif_manifest_url(solr_document) }

  before do
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://californica.url/concern/works')
  end

  describe '#iiif_manifest_url' do
    context 'when a url is stored' do
      it 'uses that url' do
        expect(iiif_manifest_url).to eq 'https://manifest.store/ark%3A%2Fabc%2F123/manifest'
      end
    end

    context 'when the url includes `ingest.iiif`' do
      let(:solr_document) do
        SolrDocument.new(id: id,
                         ark: ark,
                         iiif_manifest_url_ssi: 'https://ingest.iiif.library.ucla.edu/ark%3A%2Fabc%2F123/manifest')
      end

      it 'removes the `ingest` domain' do
        expect(service.iiif_manifest_url(solr_document)).to eq 'https://iiif.library.ucla.edu/ark%3A%2Fabc%2F123/manifest'
      end
    end

    context 'when nothing is stored' do
      let(:solr_document) { SolrDocument.new(id: id) }

      it 'builds a local url using the solr ID, *not* the ARK' do
        expect(iiif_manifest_url).to eq "https://californica.url/concern/works/#{id}/manifest"
      end
    end
  end

  describe '#src' do
    before do
      allow(request).to receive(:query_parameters).and_return({})
    end

    let(:request) { instance_double('ActionDispatch::Request', base_url: 'http://test.url') }
    let(:src) { service.src(request, solr_document) }

    context 'by default' do
      it 'links to universal viewer' do
        allow(Flipflop).to receive(:sinai?).and_return(false)

        expect(src).to eq 'https://p-w-dl-viewer01.library.ucla.edu/uv.html#?manifest=https%3A%2F%2Fmanifest.store%2Fark%253A%252Fabc%252F123%2Fmanifest'
      end
    end

    context 'when the link parameter "cv" exists' do
      it 'links to the corresponding Work page in the universal viewer' do
        allow(request).to receive(:query_parameters).and_return('cv' => 7)
        expect(CGI.parse(URI.parse(src.sub('#?', '?')).query)['cv'][0]).to eq '7'
      end
    end
  end
end
