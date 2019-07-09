# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'The photographer field of the item display view', :clean, type: :system do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_attributes)
    solr.commit
  end

  let(:work_attributes) do
    {
      id: '123_photographer_display',
      photographer_tesim: ['photographer1'],
      read_access_group_ssim: ["public"],
      has_model_ssim: ['Work']
    }
  end

  it 'lists the photographer as a link to a search for that photographer' do
    visit('/catalog/123_photographer_display')

    page.within('dd.blacklight-photographer_tesim') do
      expect(page).to have_link('photographer1', href: '/catalog?f%5Bphotographer_sim%5D%5B%5D=photographer1')
    end
  end
end
