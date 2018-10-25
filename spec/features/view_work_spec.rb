# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "View a Work" do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_attributes)
    solr.commit
  end

  let(:id) { '123' }

  let(:work_attributes) do
    {
      id: id,
      has_model_ssim: ['Work'],
      title_tesim: ['The Title of my Work'],
      identifier_tesim: ['ark 123'],
      subject_tesim: ['Subj 1', 'Subj 2'],
      resource_type_tesim: ['still image'],
      rights_statement_tesim: ['http://rightsstatements.org/vocab/InC/1.0/'],
      genre_tesim: ['news photographs'],
      named_subject_tesim: ["Los Angeles County (Calif.). $b Board of Supervisors"],
      repository_tesim: ['University of California, Los Angeles. Library. Department of Special Collections'],
      publisher_tesim: ['Los Angeles Daily News'],
      rights_country_tesim: ['US'],
      rights_holder_tesim: ['Charles E. Young'],
      normalized_date_tesim: ['1947-09-17'],
      local_identifier_tesim: ['local id 123'],
      date_created_tesim: ["September 17, 1947"],
      medium_tesim: ['1 photograph'],
      extent_tesim: ['1 photograph'],
      dimensions_tesim: ['10 x 12.5 cm.'],
      funding_note_tesim: ['Info about funding'],
      geographic_coordinates_ssim: ['34.0, -118.2'],
      caption_tesim: ['the caption'],
      language_tesim: ['No linguistic content'],
      photographer_tesim: ['Poalillo, Charles']
    }
  end

  scenario 'displays the metadata' do
    visit solr_document_path(id)

    expect(page).to have_content 'The Title of my Work'
    expect(page).to have_content 'Identifier: ark 123'
    expect(page).to have_content 'Subjects: Subj 1'
    expect(page).to have_content 'Subj 2'
    expect(page).to have_content 'Resource Type: still image'
    expect(page).to have_content 'Copyright Status: http://rightsstatements.org/vocab/InC/1.0/'
    expect(page).to have_content 'Genre: news photographs'
    expect(page).to have_content 'Name (subject): Los Angeles County (Calif.). $b Board of Supervisors'
    expect(page).to have_content 'Repository: University of California, Los Angeles. Library. Department of Special Collections'
    expect(page).to have_content 'Publisher: Los Angeles Daily News'
    expect(page).to have_content 'Rights (country of creation): US'
    expect(page).to have_content 'Rights Holder: Charles E. Young'
    expect(page).to have_content 'Normalized Date: 1947-09-17'
    expect(page).to have_content 'Local Identifier: local id 123'
    expect(page).to have_content 'Date Created: September 17, 1947'
    expect(page).to have_content 'Medium: 1 photograph'
    expect(page).to have_content 'Extent: 1 photograph'
    expect(page).to have_content 'Dimensions: 10 x 12.5 cm.'
    expect(page).to have_content 'Funding Note: Info about funding'
    expect(page).to have_content 'Geographic Coordinates: 34.0, -118.2'
    expect(page).to have_content 'Caption: the caption'
    expect(page).to have_content 'Language: No linguistic content'
    expect(page).to have_content 'Photographer: Poalillo, Charles'
  end
end
