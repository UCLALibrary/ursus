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
      title_tesim: ['Orange Carrot']
    }
  end

  let(:banana) do
    {
      id: '222',
      has_model_ssim: ['Work'],
      title_tesim: ['Yellow Banana']
    }
  end

  scenario 'get correct search results' do
    visit root_path

    within '#documents' do
      expect(page).to have_link('Orange Carrot')
      expect(page).to have_link('Yellow Banana')
    end 

    # Search for something
    fill_in 'q', with: 'carrot'
    click_on 'search'

    within '#documents' do
      expect(page).to     have_link('Orange Carrot')
      expect(page).to_not have_link('Yellow Banana')
    end
  end
end
