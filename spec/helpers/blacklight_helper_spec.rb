# frozen_string_literal: true
# https://github.com/UCLALibrary/ursus/blob/master/spec/helpers/blacklight_helper_spec.rb

require 'rails_helper'

RSpec.describe BlacklightHelper, type: :helper do
  before do
    allow(helper).to receive(:current_or_guest_user).and_return(User.new)
    @document = document
  end

  describe 'render_license' do
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
      it 'does not render a licence' do
        expect(render_license).to be ''
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

  describe 'render_opac_link' do
    xit do
    end
  end
end
