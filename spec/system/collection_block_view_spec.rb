# coding: utf-8
# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "Search results page", :clean do
  let(:work_3_attributes) { THIRD_WORK }
  let(:collection) { FIRST_COLLECTION }

  before do
    solr = Blacklight.default_index.connection
    solr.add(work_3_attributes)
    solr.add(collection)
    solr.commit
    solr.optimize
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  it 'displays a collection via a facet' do
    visit '/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Photographic%20Collection'
    expect(page).to have_content 'Photographic'
    # expect(page).to have_content 'Browse by Title'
    # expect(page).to have_content 'About the Collection'
    # expect(page).to have_content 'Contact'
    # expect(page).to have_content 'Find This Collection'
    # expect(page).to have_content 'Description'
    # expect(page).to have_content 'Date created'
    # expect(page).to have_content 'Repository'
    # expect(page).to have_content 'Languages'
    expect(page).to have_xpath("//input[@placeholder='Search this collection']")
  end

  context 'the placeholder displays the correct search prompt' do
    it 'when on a search open to a particular collection' do
      visit '/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Photographic%20Collection'
      expect(page).to have_xpath("//input[@placeholder='Search this collection']")
    end

    it 'when on the home page' do
      visit '/'
      expect(page).to have_xpath("//input[@placeholder='Search']")
    end
  end

  context 'when collection data is missing' do
    let(:collection) { { id: 'coll123' } }

    it 'loads without an error' do
      visit '/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Photographic%20Collection'
      expect(page).to have_content 'Photographic'
    end
  end
end
