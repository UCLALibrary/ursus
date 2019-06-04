# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Search the catalog', :clean, type: :system do
  before do
    delete_all_documents_from_solr
    solr = Blacklight.default_index.connection
    solr.add([llama, newt])
    solr.commit
  end

  let(:llama) do
    {
      id: '111',
      has_model_ssim: ['Work'],
      title_tesim: ['Llama Love'],
      year_isim: [1920]
    }
  end

  let(:newt) do
    {
      id: '222',
      has_model_ssim: ['Work'],
      title_tesim: ['Newt Nutrition'],
      year_isim: [1940]
    }
  end

  it 'gets correct search results' do
    visit root_path
    click_on 'search'

    within '#documents' do
      expect(page).to have_link('Llama Love')
      expect(page).to have_link('Newt Nutrition')
    end

    fill_in 'range_year_isim_begin', with: '1920'
    fill_in 'range_year_isim_end', with: '1925'
    click_on 'Limit'

    within '#documents' do
      expect(page).to     have_link('Llama Love')
      expect(page).to_not have_link('Newt Nutrition')
    end
  end
end
