# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "View a work you aren't authorized to see", js: true do
  before do
    solr = Blacklight.default_index.connection
    solr.add([restricted_work])
    solr.commit
  end

  let(:work_id) { '123' }

  let(:restricted_work) do
    {
      id: work_id,
      ark_ssi: ['ark:/123/123'],
      has_model_ssim: ['Work'],
      title_tesim: ['Restricted Work']
    }
  end

  it 'denies access' do
    visit solr_document_path(work_id)
    expect(page).to have_content 'The page you were looking for doesn\'t exist'
  end
end
