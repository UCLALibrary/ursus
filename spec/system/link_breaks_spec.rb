# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'View a a work with breaks', type: :system do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  let(:id) { '123' }

  let(:work_attributes) do
    {
      id: id,
      has_model_ssim: ['Work'],
      title_tesim: ['The Title of my Work'],
      description_tesim: ['Description 1', 'Description 2'],
      identifier_tesim: ['ark 123'],
      subject_tesim: ['Subj 1', 'Subj 2'],
      resource_type_tesim: ['still image'],
      human_readable_rights_statement_tesim: ['copyrighted'],
      genre_tesim: ['Genre 1', 'Genre 2', 'Genre 3'],
      named_subject_tesim: ["Named Subject 1", "Named Subject 2", "Named Subject 3", "Named Subject 4"],
      repository_tesim: ['University of California, Los Angeles. Library. Department of Special Collections'],
      location_tesim: ['Los Angeles'],
      publisher_tesim: ['Los Angeles Daily News'],
      rights_country_tesim: ['US'],
      rights_holder_tesim: ['Charles E. Young'],
      normalized_date_tesim: ['1934-56-78'], # unique value so we can test it doesn't display
      local_identifier_ssm: ['local id 123'],
      date_created_tesim: ["September 17, 1947"],
      medium_tesim: ['1 photograph'],
      extent_tesim: ['1 photograph'],
      dimensions_tesim: ['10 x 12.5 cm.'],
      funding_note_tesim: ['Info about funding'],
      geographic_coordinates_ssim: ['34.0, -118.2'],
      caption_tesim: ['the caption'],
      language_tesim: ['No linguistic content'],
      photographer_tesim: ['Poalillo, Charles'],
      read_access_group_ssim: ["public"],
      license_tesim: ['https://creativecommons.org/licenses/by/4.0/']
    }
  end

  it 'displays line breaks between the values of certain fields' do
    visit solr_document_path(id)
    expect(page.find('dd.blacklight-description_tesim').all(:css, 'br').length).to eq 1
    expect(page.find('dd.blacklight-subject_tesim').all(:css, 'br').length).to eq 1
    expect(page.find('dd.blacklight-genre_tesim').all(:css, 'br').length).to eq 2
    expect(page.find('dd.blacklight-named_subject_tesim').all(:css, 'br').length).to eq 3
  end
end
