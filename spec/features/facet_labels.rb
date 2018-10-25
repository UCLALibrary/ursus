# frozen_string_literal: true
require 'rails_helper'
include Warden::Test::Helpers

RSpec.feature 'The facet sidebar', :clean, js: false do
  it 'displays expected facet labels' do
    visit('/catalog')
    facet_headings = page.all(:css, 'h3.facet-field-heading/a').to_a.map { |a| a.text }
    expect(facet_headings).to contain_exactly(
      'Subject',
      'Resource Type',
      'Genre',
      'Name (Subject)',
      'Location',
      'Normalized Date',
      'Medium',
      'Dimensions',
      'Language'
    )
  end
end
