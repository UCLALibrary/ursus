# frozen_string_literal: true

require 'rails_helper'

RSpec.describe IiifService do
  let(:service) { described_class.new }
  let(:solr_document) do
    SolrDocument.new(id: 'abc123',
                     iiif_manifest_url_ssi: 'https://manifest.store/abc123/manifest')
  end

  before do
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://californica.url/concern/works')
  end

  describe '#iiif_manifest_url' do
    context 'when a url is stored and feature enabled' do
      it 'uses that url' do
        allow(Flipflop).to receive(:use_manifest_store?).and_return(true)
        expect(service.iiif_manifest_url(solr_document)).to eq 'https://manifest.store/abc123/manifest'
      end
    end

    context 'when a url is stored but feature is disabled' do
      it 'builds a local url' do
        allow(Flipflop).to receive(:use_manifest_store?).and_return(false)
        expect(service.iiif_manifest_url(solr_document)).to eq 'https://californica.url/concern/works/abc123/manifest'
      end
    end

    context 'when nothing is stored' do
      let(:solr_document) { SolrDocument.new(id: 'abc123') }

      it 'builds a local url' do
        allow(Flipflop).to receive(:use_manifest_store?).and_return(true)
        expect(service.iiif_manifest_url(solr_document)).to eq 'https://californica.url/concern/works/abc123/manifest'
      end
    end
  end
end
