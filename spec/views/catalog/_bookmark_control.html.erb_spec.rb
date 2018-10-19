# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'catalog/_bookmark_control.html.erb' do
  let(:document) { SolrDocument.new id: 'xyz', format: 'a' }
  let(:blacklight_config) { Blacklight::Configuration.new }

  before do
    assign :document, document
    allow(view).to receive(:blacklight_config).and_return blacklight_config
  end

  it 'does not render anything unless it is turned on via config' do
    render
    expect(rendered).to match(//)
  end
end
