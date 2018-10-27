# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Search the catalog' do
  before do
    delete_all_documents_from_solr
    solr = Blacklight.default_index.connection
    solr.add([orange, banana])
    solr.commit
  end

  let(:orange) do
    {
      id: '111',
      has_model_ssim: ['Work'],
      title_tesim: ['Orange Carrot'],
      photographer_tesim: ['Bittersweet Tangerine']
    }
  end

  let(:banana) do
    {
      id: '222',
      has_model_ssim: ['Work'],
      title_tesim: ['Yellow Banana'],
      photographer_tesim: ['Buff Saffron']
    }
  end

  scenario 'get correct search results' do
    visit root_path
    # Search for something
    fill_in 'q', with: 'carrot'
    click_on 'search'

    within '#documents' do
      expect(page).to     have_link('Orange Carrot')
      expect(page).to_not have_link('Yellow Banana')
    end
  end

  scenario 'verify facet links are present' do
    visit root_path
    # Search for something
    fill_in 'q', with: 'carrot'
    click_on 'search'
    within '#documents' do
      expect(page).to have_link('Bittersweet Tangerine')
      expect(page).to_not have_link('Buff Saffron')
    end
  end
end
