# frozen_string_literal: true

require 'rails_helper'

RSpec.feature 'Search the catalog' do
  before do
    delete_all_documents_from_solr
    solr = Blacklight.default_index.connection
    solr.add([orange, banana])
    solr.add([creator, contributor, publisher, genre, medium, named_subject])
    solr.commit
  end

  let(:orange) do
    {
      id: '111',
      has_model_ssim: ['Work'],
      title_tesim: ['Orange Carrot'],
      photographer_tesim: ['Bittersweet Tangerine'],
      description_tesim: ['Long description Long description Long description Long description Long description Long description']
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

  let(:creator) do
    {
      id: '333',
      has_model_ssim: ['Work'],
      title_tesim: 'Target in creator',
      creator_tesim: ['3Guv4P44']
    }
  end

  let(:contributor) do
    {
      id: '444',
      has_model_ssim: ['Work'],
      title_tesim: 'Target in contributor',
      contributor_tesim: ['3Guv4P44']
    }
  end

  let(:publisher) do
    {
      id: '555',
      has_model_ssim: ['Work'],
      title_tesim: 'Target in publisher',
      publisher_tesim: ['3Guv4P44']
    }
  end

  let(:genre) do
    {
      id: '666',
      has_model_ssim: ['Work'],
      title_tesim: 'Target in genre',
      genre_tesim: ['3Guv4P44']
    }
  end

  let(:medium) do
    {
      id: '777',
      has_model_ssim: ['Work'],
      title_tesim: 'Target in medium',
      medium_tesim: ['3Guv4P44']
    }
  end

  let(:named_subject) do
    {
      id: '888',
      has_model_ssim: ['Work'],
      title_tesim: 'Target in named_subject',
      named_subject_tesim: ['3Guv4P44']
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

  scenario 'searches the right fields' do
    visit root_path
    fill_in 'q', with: '3Guv4P44'
    click_on 'search'

    within '#documents' do
      result_titles = page.all(:css, 'h3.document-title-heading/a').to_a.map(&:text)
      expect(result_titles).to contain_exactly(
        'Target in creator',
        'Target in contributor',
        'Target in publisher',
        'Target in named_subject',
        'Target in genre',
        'Target in medium'
      )
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

  scenario 'verify view more links are present' do
    visit root_path
    # Search for something
    fill_in 'q', with: 'carrot'
    click_on 'search'
    expect(page).to have_content('Read More')
  end
end
