# frozen_string_literal: true
require 'rails_helper'

RSpec.describe BlacklightHelper, type: :helper  do
  before do
    allow(helper).to receive(:current_or_guest_user).and_return(User.new)
    @document = document
  end
  context 'cc 4.0 license' do
    let(:document) do
      SolrDocument.new(
        'title_tsim' => "A Fake Document",
        'id' => '8',
        'license_tesim' => ["http://creativecommons.org/licenses/by/4.0/"]
      )
    end
    it 'renders a cc license' do
      expect(render_license).to match(/Creative Commons Attribution 4.0 International License/)
    end
  end
  context 'no license' do
    let(:document) do
      SolrDocument.new(
        'title_tsim' => "A Fake Document",
        'id' => '8'
      )
    end
    it 'returns a default value' do
      expect(render_license).to match(/No license recorded/)
    end
  end
  context 'a different value' do
    let(:document) do
      SolrDocument.new(
        'title_tsim' => "A Fake Document",
        'id' => '8',
        'license_tesim' => ["some other value"]
      )
    end
    it 'returns a default value' do
      expect(render_license).to eq "some other value"
    end
  end
end
