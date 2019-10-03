# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SearchFieldService do
  let(:search_field_service) { described_class.instance }

  it 'returns the correct list of search fields' do
    expect(search_field_service.search_fields).to eq(%w[ alternative_title_tesim architect_tesim binding_note_ssi caption_tesim collation_ssi composer_tesim contents_note_tesim
                                                         contributor_tesim creator_tesim description_tesim foliation_ssi genre_tesim
                                                         identifier_tesim illuminator_tesim illustrations_note_tesim local_identifier_ssm location_tesim lyricist_tesim medium_tesim
                                                         named_subject_tesim normalized_date_tesim
                                                         page_layout_ssim photographer_tesim place_of_origin_tesim provenance_tesim
                                                         publisher_tesim scribe_tesim
                                                         subject_tesim subject_topic_tesim summary_tesim title_tesim toc_tesim
                                                         uniform_title_tesim ark_ssi ].join(' '))
  end
end
