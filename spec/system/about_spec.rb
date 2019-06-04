# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'viewing the about page', :clean, type: :system, js: false do
  it 'has the right header' do
    visit('/about')
    expect(page.html).to match(/About UCLA Digital Collections/)
  end

  it 'has an accordion element' do
    visit('/about')
    expect(page.html).to match(/accordion/)
  end
end
