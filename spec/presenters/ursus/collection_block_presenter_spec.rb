# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::CollectionBlockPresenter do
  let(:response) { RESPONSE }
  let(:collection_presenter) { described_class.new(response: response) }
  let(:collection_attributes) { FIRST_COLLECTION }

  before do
    solr = Blacklight.default_index.connection
    solr.add(collection_attributes)
    solr.commit
    solr.optimize
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  it 'can determine if the collection facet is selected' do
    expect(collection_presenter.collection_selected?).to eq(true)
  end

  describe '#collection_name' do
    it 'is correct' do
      expect(collection_presenter.collection_name).to eq('Connell (Will) Papers')
    end
  end

  describe '#service_contact' do
    it 'is correct' do
      expect(collection_presenter.service_contact).to eq('someone somewhere')
    end
  end

  describe '#collection_description' do
    it 'is correct' do
      expect(collection_presenter.collection_description).to eq('Description 3')
    end
  end

  describe '#collection_date_created' do
    it 'is correct' do
      expect(collection_presenter.collection_date_created).to eq('Date 1')
    end
  end

  describe '#collection_repository' do
    it 'is correct' do
      expect(collection_presenter.collection_repository).to eq('UCLA Collection')
    end
  end

  describe '#collection_languages' do
    it 'is correct' do
      expect(collection_presenter.collection_languages).to eq('English, Spanish, and Greek')
    end
  end

  describe '#collection_document' do
    it 'caches the SolrDocument' do
      allow(SolrDocument).to receive(:find).and_return('First Solr Call')
      collection_presenter.collection_document
      allow(SolrDocument).to receive(:find).and_return('Second Solr Call')
      expect(collection_presenter.collection_document).to eq 'First Solr Call'
    end

    it 'can get the collection document' do
      expect(collection_presenter.collection_document[:id]).to eq('coll123')
    end

    it ' can get the description' do
      expect(collection_presenter.collection_document['description_tesim'][0]).to eq('Description 3')
    end

    it ' can get the date the collection was created' do
      expect(collection_presenter.collection_document['date_created_tesim']).to eq(['Date 1'])
    end

    it ' can get the repository name' do
      expect(collection_presenter.collection_document['repository_tesim']).to eq(['UCLA Collection'])
    end

    it ' can get the languages of the collection' do
      expect(collection_presenter.collection_document['human_readable_language_tesim']).to eq(['English', 'Spanish', 'Greek'])
    end
  end
end
