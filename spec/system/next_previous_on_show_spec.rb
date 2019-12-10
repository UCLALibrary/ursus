# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'the result bar displays the correct links', :clean, type: :system, js: true do
  let(:work_1_attributes) { SECOND_WORK }
  let(:work_2_attributes) { THIRD_WORK }
  let(:work_3_attributes) { FOURTH_WORK }

  before do
    solr = Blacklight.default_index.connection
    solr.add(work_1_attributes)
    solr.add(work_2_attributes)
    solr.add(work_3_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  it 'has expected fields on initial search page and show page' do
    visit '/catalog?q=Person&search_field=all_fields'
    expect(page).to have_content '2 Catalog Results'
    expect(page).to have_content 'You searched for: Person'
    expect(page).to have_content 'Start Over'
    click_link('Title One', match: :first)
    expect(page).to have_content '1 of 2 results'
    expect(page).to have_content 'Back to Search'
    expect(page).to have_content 'New Search'
    expect(page).not_to have_content 'Cite This Item'
  end
end
