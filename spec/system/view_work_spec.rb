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
  let(:id) { FIRST_WORK[:id] }

  it 'displays the metadata' do
    visit solr_document_path(id)

    expect(page).to have_selector('.primary-metadata')
    expect(page).to have_selector('.secondary-metadata')
    expect(page).to have_content 'The Title of my Work'
    expect(page).to have_content 'Description: Description 1'
    expect(page).to have_content 'Description 2'
    expect(page).to have_content 'Subjects: Subj 1'
    expect(page).to have_content 'Resource Type: still image'
    expect(page).to have_content 'Copyright Status: copyrighted'
    expect(page).to have_content 'Genre: Genre 1'
    expect(page).to have_content 'Names: Named Subject 1'
    expect(page).to have_content 'Location: Los Angeles'
    expect(page).to have_content 'Repository: University of California, Los Angeles. Library. Department of Special Collections'
    expect(page).to have_content 'Publisher: Los Angeles Daily News'
    expect(page).to have_content 'Rights Country: US'
    expect(page).to have_content 'Rights Holder: Charles E. Young'
    expect(page).to_not have_content 'Normalized Date:'
    expect(page).to_not have_content '1934-56-78'
    expect(page).to have_content 'Local identifier: local id 123'
    expect(page).to have_content 'Date Created: September 17, 1947'
    expect(page).to have_content 'Medium: 1 photograph'
    expect(page).to have_content 'Extent: 1 photograph'
    expect(page).to have_content 'Dimensions: 10 x 12.5 cm.'
    expect(page).to have_content 'Funding Note: Info about funding'
    expect(page).to have_content 'Caption: the caption'
    expect(page).to have_content 'Language: No linguistic content'
    expect(page).to have_content 'Photographer: Poalillo, Charles'
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
  end

  context 'license' do
    it 'displays the creative commons text and logo when there is a cc license' do
      visit solr_document_path(id)
      expect(page).to have_content 'License'
      expect(page).to have_link 'Creative Commons Attribution 4.0 International License'
    end
  end

  it 'displays facetable fields as links' do
    visit solr_document_path(id)
    expect(page.find('dd.blacklight-subject_tesim')).to have_link 'Subj 1'
    expect(page.find('dd.blacklight-subject_tesim')).to have_link 'Subj 2'
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

  it 'only displays the tools we want to support' do
    visit solr_document_path(id)

    # we DO NOT want the tools panel
    expect(page).not_to have_content 'Tools'

    # we DO want the citation link
    expect(page.find('a#citationLink')).to have_content 'Cite This Item'

    # we DO NOT want the SMS This or Email links
    expect(page).to_not have_content 'SMS This'
    expect(page).to_not have_selector '#emailLink'
  end

  it 'loads UV on the page with the correct controls' do
    visit solr_document_path(id)
    expect(page.html).to match(/universal-viewer-iframe/)

    within_frame(find('#universal-viewer-iframe')) do
      # Don't show download
      expect(page).to have_selector('button.download', visible: false)
      # Show fullscreen
      # This will only be visible when the screen is desktop size
      # Look into setting the chromedriver window size explicilty for this
      # expect(page).to have_selector('button.fullScreen', visible: true)
    end
  end
end
