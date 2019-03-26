# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "Search collection results page" do
  before do
    solr = Blacklight.default_index.connection
    solr.add(collection_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  let(:collection_attributes) do
    {
      id:'id123',
      has_model_ssim: ['Collection'],
      title_tesim: ['Title'],
      description_tesim: ['Description 1'],
      thumbnail_path_ss:'/assets/collection-a38b932554788aa578debf2319e8c4ba8a7db06b3ba57ecda1391a548a4b6e0a.png',
      location_tesim: ['search_collection_results_spec'] # to control what displays
    }
  end

  scenario 'displays collection: title, description,' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_collection_results_spec'
    expect(page).to have_content 'Title'
    expect(page).to have_content 'Description: Description 1'
  end

  scenario 'has a gallery view button' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_collection_results_spec'
    expect(page).to have_selector '.view-type-gallery'
  end

  scenario 'has a list view button' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_collection_results_spec'
    expect(page).to have_selector '.view-type-list'
  end
end
