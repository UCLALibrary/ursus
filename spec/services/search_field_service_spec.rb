# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SearchFieldService do
  let(:search_field_service) { described_class.instance }

  it 'returns the correct list of search fields' do
    expect(search_field_service.search_fields).to eq('caption_tesim contributor_tesim creator_tesim description_tesim genre_tesim identifier_tesim local_identifier_tesim location_tesim medium_tesim named_subject_tesim normalized_date_tesim photographer_tesim publisher_tesim subject_tesim title_tesim')
  end
end
