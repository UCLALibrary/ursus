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
end
