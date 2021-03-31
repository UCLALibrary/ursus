# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SearchFieldService do
  let(:search_field_service) { described_class.instance }
  it 'returns the correct list of search fields' do
    expect(search_field_service.search_fields).to eq(['ark_ssi', 'alternative_title_tesim', 'architect_tesim', 'author_tesim', 'binding_note_tesim', 'caption_tesim', 'collation_tesim', 'colophon_tesim', 'composer_tesim', 'condition_note_ssi', 'contents_note_tesim', 'contributor_tesim', 'creator_tesim', 'date_created_tesim', 'description_tesim', 'explicit_tesim', 'features_tesim', 'foliation_tesim', 'genre_tesim', 'human_readable_language_tesim', 'identifier_tesim', 'illuminator_tesim', 'illustrations_note_tesim', 'inscription_tesim', 'incipit_tesim', 'local_identifier_ssm', 'location_tesim', 'lyricist_tesim', 'medium_tesim', 'named_subject_tesim', 'page_layout_ssim', 'opac_url_ssi', 'page_layout_ssim', 'photographer_tesim', 'place_of_origin_tesim', 'provenance_tesim', 'publisher_tesim', 'scribe_tesim', 'script_tesim', 'subject_tesim', 'subject_topic_tesim', 'summary_tesim', 'support_tesim', 'title_tesim', 'toc_tesim', 'uniform_title_tesim', 'hand_note_tesim', 'writing_system_tesim', 'uniform_title_tesim', 'shelfmark_ssi', 'descriptive_title_tesim', 'delivery_tesim', 'other_versions_tesim', 'repository_tesim'].join(' '))
  end
end
