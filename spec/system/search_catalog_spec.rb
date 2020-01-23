# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Search the catalog', type: :system, js: false do
  before do
    delete_all_documents_from_solr
    solr = Blacklight.default_index.connection
    solr.add([orange, banana, creator, contributor, publisher, genre, medium, named_subject, sinai_work])
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

  let(:sinai_work) do
    {
      id: '999',
      has_model_ssim: ['Work'],
      title_tesim: 'Sinai work RsYAM429',
      visibility_ssi: 'sinai'
    }
  end

  it 'gets correct search results' do
    visit root_path
    # Search for something
    fill_in 'q', with: 'carrot'
    click_on 'search'

    within '#documents' do
      expect(page).to     have_link('Orange Carrot')
      expect(page).to_not have_link('Yellow Banana')
    end
  end

  it 'searches the right fields' do
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

  it 'has expected facet links' do
    visit root_path
    # Search for something
    fill_in 'q', with: 'carrot'
    click_on 'search'
    within '#documents' do
      expect(page).to have_link('Bittersweet Tangerine')
      expect(page).to_not have_link('Buff Saffron')
    end
  end

  it 'has expected view more links' do
    visit root_path
    # Search for something
    fill_in 'q', with: 'carrot'
    click_on 'search'
    expect(page).not_to have_content('Read More')
  end

  context 'when the sinai? flag is disabled' do
    before { allow(Flipflop).to receive(:sinai?).and_return(false) }

    it 'doesn\'t return works with "sinai" visibility' do
      visit root_path
      fill_in 'q', with: 'RsYAM429'
      click_on 'search'

      expect(page).to_not have_link('Sinai work RsYAM429')
      expect(page).to have_content('0 Catalog Results')
    end
  end
end
