# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::PrimaryMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'secondary_metadata.yml'))) }
  let(:doc) do
    {
      'id': id,
      'has_model_ssim': ['Work'],
      'title_tesim': ['The Title of my Work'],
      'description_tesim': ['Description 1', 'Description 2'],
      'identifier_tesim': ['ark 123'],
      'subject_tesim': ['Subj 1', 'Subj 2'],
      'resource_type_tesim': ['still image'],
      'human_readable_rights_statement_tesim': ['copyrighted'],
      'genre_tesim': ['Genre 1', 'Genre 2', 'Genre 3'],
      'named_subject_tesim': ["Named Subject 1", "Named Subject 2", "Named Subject 3", "Named Subject 4"],
      'repository_tesim': ['University of California, Los Angeles. Library. Department of Special Collections'],
      'location_tesim': ['Los Angeles'],
      'publisher_tesim': ['Los Angeles Daily News'],
      'rights_country_tesim': ['US'],
      'rights_holder_tesim': ['Charles E. Young'],
      'normalized_date_tesim': ['1934-56-78'], # unique value so we can test it doesn't display
      'local_identifier_tesim': ['local id 123'],
      'date_created_tesim': ["September 17, 1947"],
      'medium_tesim': ['1 photograph'],
      'extent_tesim': ['1 photograph'],
      'dimensions_tesim': ['10 x 12.5 cm.'],
      'funding_note_tesim': ['Info about funding'],
      'geographic_coordinates_ssim': ['34.0, -118.2'],
      'caption_tesim': ['the caption'],
      'language_tesim': ['No linguistic content'],
      'photographer_tesim': ['Poalillo, Charles'],
      'member_of_collections_ssim': ['Photographic Collection'],
      'license_tesim': ['https://creativecommons.org/licenses/by/4.0/']
    }
  end

  context 'with a solr document containing secondary metadata' do
    describe '#terms' do
      it 'returns a hash that only has the primary metadata' do
        expect(pres.terms).not_to include('https://creativecommons.org/licenses/by/4.0/')
      end
    end
  end
end
