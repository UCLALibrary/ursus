# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SearchFieldService do
  let(:search_field_service) { described_class.instance }
  it 'returns the correct list of search fields' do
    expect(search_field_service.search_fields).to eq(%w[ alternative_title_tesim architect_tesim author_tesim binding_note_ssi caption_tesim collation_tesim colophon_tesim composer_tesim condition_note_tesim contents_note_tesim contributor_tesim creator_tesim description_tesim explicit_tesim features_tesim foliation_tesim genre_tesim identifier_tesim illuminator_tesim illustrations_note_tesim inscription_tesim incipit _tesim local_identifier_ssm location_tesim lyricist_tesim medium_tesim named_subject_tesim normalized_date_tesim page_layout_ssim opac_url_ssi photographer_tesim place_of_origin_tesim provenance_tesim publisher_tesim scribe_tesim script_tesim subject_tesim subject_topic_tesim summary_tesim title_tesim toc_tesim writing_and_hands_tesim writing_system_tesim uniform_title_tesim ark_ssi ].join(' '))
  end
end
