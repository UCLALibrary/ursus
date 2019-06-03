# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::CollectionBlockPresenter do
  let(:response) { RESPONSE }
  let(:collection_presenter) { described_class.new(response: response) }

  it 'can determine if the collection facet is selected' do
    expect(collection_presenter.collection_selected?).to eq(true)
  end

  it ' can get the collection name' do
    expect(collection_presenter.collection_name).to eq('Connell (Will) Papers')
  end

  it ' can get the description' do
    collection_document['description_tesim']
  end

  it ' can get the date the collection was created' do
    collection_document['date_created_tesim']
  end

  it ' can get the repository name' do
    collection_document['repository_tesim']
  end

  it ' can get the languages of the collection' do
    collection_document['languages_tesim']
  end
end
