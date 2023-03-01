# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'View a Work', type: :system, js: true do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
    allow_any_instance_of(IiifService).to receive(:src).and_return('/uv/uv.html#?manifest=/manifest.json')
  end

  let(:work_attributes) { FIRST_WORK }
  let(:ark) { FIRST_WORK[:ark_ssi] }

  it 'displays the metadata' do
    visit "/catalog/#{ark}"

    expect(page).to have_selector('.item-page__primary-metadata')
    expect(page).to have_selector('.item-page__secondary-metadata')
    expect(page).to have_content 'The Title of my Work'
    expect(page).to have_content 'DESCRIPTION Description 1'
    expect(page).to have_content 'Description 2'
    expect(page).to have_content 'SUBJECT Subj 1'
    expect(page).to have_content 'RESOURCE TYPE still image'
    expect(page).to have_content 'RIGHTS STATEMENT copyrighted'
    expect(page).to have_content 'GENRE Genre 1'
    expect(page).to have_content 'NAMES Named Subject 1'
    expect(page).to have_content 'LOCATION Los Angeles'
    expect(page).to have_content 'REPOSITORY University of California, Los Angeles. Library. Department of Special Collections'
    expect(page).to have_content 'PUBLISHER Los Angeles Daily News'
    expect(page).to have_content 'RIGHTS COUNTRY US'
    expect(page).to have_content 'RIGHTS HOLDER Charles E. Young'
    expect(page).to_not have_content 'NORMALIZED DATE'
    expect(page).to_not have_content '1934-56-78'
    expect(page).to have_content 'LOCAL IDENTIFIER local id 123'
    expect(page).to have_content 'DATE CREATED September 17, 1947'
    expect(page).to have_content 'MEDIUM 1 photograph'
    expect(page).to have_content 'EXTENT 1 photograph'
    expect(page).to have_content 'DIMENSIONS 10 x 12.5 cm.'
    expect(page).to have_content 'FUNDING NOTE Info about funding'
    expect(page).to have_content 'CAPTION the caption'
    expect(page).to have_content 'LANGUAGE No linguistic content'
    expect(page).to have_content 'PHOTOGRAPHER Poalillo, Charles'
    expect(page).to have_content 'ark:/24920492/029402'
    expect(page).to have_content 'ARK'
    expect(page).to have_content 'Item Overview'
    expect(page).to have_content 'Notes'
    expect(page).to have_content 'Physical Description'
    expect(page).to have_content 'Keywords'
    expect(page).to have_content 'Find This Item'
    expect(page).to have_content 'Access Condition'
    expect(page).to have_content 'UCLA Special Collections Services Contact'

    expect(page).to have_content '-118.4398'
    expect(page).to have_content '34.0700'
    expect(page).to have_content 'Alernative Title of my Work'
    expect(page).to have_content 'Uniform Title of my Work'
    expect(page).to have_content 'Alexander Butterfly'
    # expect(page).to have_content '1974'
    expect(page).to have_content 'Dudley, MA'
    expect(page).to have_content 'Powell Library'
    expect(page).to have_content 'Film Still'
    expect(page).to have_content 'Mom & Dad'
    expect(page.html).to match(/<img src="http:/)
  end

  context 'license' do
    it 'displays the creative commons text and logo when there is a cc license' do
      visit "/catalog/#{ark}"
      expect(page).to have_content 'License'
      expect(page).to have_link 'Creative Commons Attribution 4.0 International License'
    end
  end

  it 'displays facetable fields as links' do
    visit "/catalog/#{ark}"
    expect(page.find('dd.blacklight-combined_subject_ssim')).to have_link 'Subj 1'
    expect(page.find('dd.blacklight-combined_subject_ssim')).to have_link 'Subj 2'
    expect(page.find('dd.blacklight-human_readable_resource_type_tesim')).to have_link 'still image'
    expect(page.find('dd.blacklight-genre_tesim')).to have_link 'Genre 1'
    expect(page.find('dd.blacklight-genre_tesim')).to have_link 'Genre 2'
    expect(page.find('dd.blacklight-named_subject_tesim')).to have_link 'Named Subject 1'
    expect(page.find('dd.blacklight-location_tesim')).to have_link 'Los Angeles'
    expect(page.find('dd.blacklight-photographer_tesim')).to have_link 'Poalillo, Charles'
    expect(page.find('dd.blacklight-human_readable_language_tesim')).to have_link 'No linguistic content'
    expect(page).to have_link 'Photographic Collection'
    expect(page.html).to match(/member_of_collections_ssim/)
  end

  it 'displays the schema.org values' do
    visit "/catalog/#{ark}"
    expect(page.find('div[itemtype = "http://schema.org/CreativeWork"]')['itemid']).to have_content "/catalog/#{ark}"
    # expect(page.find('dd.blacklight-genre_tesim')['itemprop']).to have_content 'genre'
    # Capybara cannot find schema.org link tag
    # expect(page.find('link[itemid$="/catalog/9qsg9000zz-89112"')['itemtype']).to have_content 'http://schema.org/Collection'
  end

  it 'only displays the tools we want to support' do
    visit "/catalog/#{ark}"

    # we DO NOT want the tools panel
    expect(page).not_to have_content 'Tools'

    # we DO want the citation link
    # expect(page.find('a#citationLink')).to have_content 'Cite This Item'

    # we DO NOT want the SMS This or Email links
    expect(page).to_not have_content 'SMS This'
    expect(page).to_not have_selector '#emailLink'
  end
end
