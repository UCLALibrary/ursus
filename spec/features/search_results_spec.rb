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
      location_tesim: ['search_results_spec'] # to control what displays
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
    expect(page).to have_link 'Date 1'
    expect(page).to have_link 'Person 1'
  end

  scenario 'displays line breaks between the values of certain fields' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec'
    expect(page.all('dd.blacklight-description_tesim')[1].all(:css, 'br').length).to eq 1
  end

#   scenario 'only displays the tools we want to support' do
#     visit solr_document_path(id)

#     # we DO want the tools panel
#     expect(page).to have_content 'Tools'

#     # we DO NOT want the SMS This link
#     expect(page).to_not have_content 'SMS This'
#   end

#   scenario 'loads UV on the page with correct IIIF URI' do
#     visit solr_document_path(id)
#     expect(page.html).to match(/iiifResourceUri: \'https:\/\/example.com\/123\/manifest/)
#   end
end
