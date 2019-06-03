# coding: utf-8
# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "Search results page", :clean do
  let(:work_3_attributes) { FIRST_WORK }

  before do
    solr = Blacklight.default_index.connection
    solr.add(work_3_attributes)
    solr.commit
    solr.optimize
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  scenario 'viewing a collection via a facet' do
    visit '/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Photographic%20Collection'
    expect(page).to have_content 'Explore the Photographic Collection'
    expect(page).to have_content 'Description'
    expect(page).to have_content 'Date created'
    expect(page).to have_content 'Repository'
    expect(page).not_to have_content 'Languages'
  end
end
