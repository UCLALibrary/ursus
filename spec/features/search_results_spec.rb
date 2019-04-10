# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "Search results page" do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_1_attributes)
    solr.add(work_2_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  # Probably smarter to use an array of objects, but I'm not familiar enough w/ rail / blacklight [AW]
  let(:work_1_attributes) do
    {
      id: 'id123',
      has_model_ssim: ['Work'],
      title_tesim: ['Title One'],
      identifier_tesim: ['ark 123'],
      description_tesim: ['Description 1', 'Description 2'],
      date_created_tesim: ["Date 1"],
      resource_type_tesim: ['still image'],
      photographer_tesim: ['Person 1', 'Person 2'],
      location_tesim: ['search_results_spec'], # to control what displays,
      thumbnail_path_ss: ["/assets/work-ff055336041c3f7d310ad69109eda4a887b16ec501f35afc0a547c4adb97ee72.png"]
    }
  end

  let(:work_2_attributes) do
    {
      id: 'id456',
      has_model_ssim: ['Work'],
      title_tesim: ['Title Two'],
      identifier_tesim: ['ark 456'],
      description_tesim: ['Description 3', 'Description 4'],
      date_created_tesim: ["Date 1"],
      resource_type_tesim: ['still image'],
      photographer_tesim: ['Person 1'],
      location_tesim: ['search_results_spec'] # to control what displays
    }
  end

  scenario 'displays: title, description, date_created, resource_type, and photographer' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec'
    expect(page).to have_content 'Title One'
    expect(page).to have_content 'Description: Description 1'
    expect(page).to have_content 'Description 2'
    expect(page).to have_content 'Resource Type: still image'
    expect(page).to have_content 'Date Created: Date 1'
    expect(page).to have_content 'Photographer: Person 1'
  end

  scenario 'displays facetable fields as links' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec'
    expect(page).to have_link 'Title One'
    expect(page).to have_link 'still image'
    expect(page).not_to have_link 'Date 1'
    expect(page).to have_link 'Person 1'
  end

  scenario 'displays the old site link with page results' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec'
    expect(page).to have_link 'original digital collections site'
  end

  scenario 'displays the old site link on page with no results' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=zebra'
    expect(page).to have_link 'original digital collections site'
  end

  scenario 'displays line breaks between the values of certain fields' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec'
    expect(page.all('br').length).to eq 1
  end
end
