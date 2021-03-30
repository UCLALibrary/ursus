# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "View a work you aren't authorized to see", js: true do
  before do
    solr = Blacklight.default_index.connection
    solr.add([restricted_work])
    solr.commit
  end

  let(:ark) { 'ark:/21198/123' }
  let(:solr_id) { ark.sub('ark:/', '').sub('/', '-').reverse }

  let(:restricted_work) do
    {
      id: solr_id,
      ark_ssi: ark,
      has_model_ssim: ['Work'],
      title_tesim: ['Restricted Work']
    }
  end

  it 'denies access' do
    visit "/catalog/#{ark}"
    expect(page).to have_content 'The page you were looking for doesn\'t exist'
  end
end
