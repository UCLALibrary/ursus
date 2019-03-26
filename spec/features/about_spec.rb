# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "viewing the about page" do
  it 'has the right header' do
    visit('/about')
    expect(page.html).to match(/About UCLA Digital Collections/)
  end

  it 'has an accordion element' do
    visit('/about')
    expect(page.html).to match(/accordion/)
  end
end
