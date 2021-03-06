# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'The facet sidebar', :clean, type: :system do
  context 'in the default site' do
    before do
      allow(Flipflop).to receive(:sinai?).and_return(false)
      solr = Blacklight.default_index.connection
      solr.add(work_attributes)
      solr.commit
    end

    let(:work_attributes) do
      {
        id: '123',
        ark_ssi: 'ark:/321',
        title_tesim: ['Title'],
        has_model_ssim: ['Work'],
        has_model_sim: ['Work'],
        combined_subject_ssim: ['People', 'Crime'],
        human_readable_resource_type_sim: ['Photograph'],
        genre_sim: ['news photographs'],
        named_subject_sim: ['Aimee McPherson Semple'],
        year_isim: [1947],
        human_readable_language_sim: ['No linguistic content'],
        location_sim: ['Echo Park'],
        member_of_collections_ssim: ['Connell'],
        repository_sim: ['Fowler Museum']
      }
    end

    it 'displays expected facet labels' do
      visit('/catalog')
      facet_headings = page.all(:css, 'h3.facet-field__heading/a').to_a.map(&:text)
      expect(facet_headings).to contain_exactly(
        'Subject',
        'Resource Type',
        'Genre',
        'Names',
        'Location',
        'Date',
        'Language',
        'Collection',
        'Repository'
      )
    end

    it 'has the text Refine your search not limit' do
      visit('/catalog')
      expect(page).to have_content('Browse items')
    end

    it 'has a Subject button for the selected facet display' do
      visit('/catalog')
      click_on 'Subject'
      click_on 'People'
      expect(page).to have_selector('.facet-selected')
    end

    it 'has a Resource Type button for the selected facet display' do
      visit('/catalog')
      click_on 'Resource Type'
      click_on 'Photograph'
      expect(page).to have_selector('.facet-selected')
    end

    it 'has a Genre button for the selected facet display' do
      visit('/catalog')
      click_on 'Genre'
      click_on 'news photographs'
      expect(page).to have_selector('.facet-selected')
    end
  end
end
