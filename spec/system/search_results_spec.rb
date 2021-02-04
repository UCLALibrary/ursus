# coding: utf-8
# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'Search results page', type: :system, js: false do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_1_attributes)
    solr.add(work_2_attributes)
    solr.add(work_3_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
  end

  let(:work_1_attributes) { SECOND_WORK }

  let(:work_2_attributes) { THIRD_WORK }

  let(:work_3_attributes) { FOURTH_WORK }

  scenario do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec'
    # it 'displays: title, description, date_created, resource_type, and photographer' do
    expect(page).to have_content 'Title One'
    expect(page).to have_content 'Description: Description 1'
    expect(page).not_to have_content 'Description 2'
    expect(page).to have_content 'Resource Type: still image'
    expect(page).to have_content 'Date: Date 1'
    expect(page).to have_content 'Photographer: Person 1'

    # it 'displays facetable fields as links' do
    expect(page).to have_link 'Title One'
    expect(page).to have_link 'still image'
    expect(page).not_to have_link 'Date 1'
    expect(page).to have_link 'Person 1'

    # it 'displays the old site link with page results' do
    expect(page).to have_link 'original digital collections site'

    # it 'displays Gallery View button' do
    expect(page).to have_link 'Gallery'

    # it 'displays List View button' do
    expect(page).to have_link 'List'

    # shows thumbnails for 'public' visibility, not for 'discovery'
    expect(page).not_to have_css("img[src*='work3.jpg']")
    expect(page).to have_css("img[src*='work4.jpg']")
  end

  it 'displays the old site link on page with no results' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=zebra'
    expect(page).to have_link 'original digital collections site'
  end

  it 'uses AND not OR for search results by default' do
    visit '/catalog?search_field=all_fields&q=Description+desc'
    expect(page).to have_content 'Title Three'
    expect(page).not_to have_content 'Title One'
  end

  it 'displays Gallery View results' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec&view=gallery'
    click_on 'Gallery'
    expect(page).to have_selector('.view-type-gallery.active')
    expect(page).to have_content 'Title One'
  end

  it 'displays List View results' do
    visit '/catalog?f%5Blocation_tesim%5D%5B%5D=search_results_spec&view=list'
    click_on 'List'
    expect(page).to have_selector('.view-type-list.active')
    expect(page).to have_content 'Title One'
    expect(page).to have_content 'Description: Description 1'
    expect(page).to have_content 'Resource Type: still image'
    expect(page).to have_content 'Date: Date 1'
  end

  it 'visits the home page and getting the correct search field options' do
    visit '/' do
      expect(page.html).to match(/<option value="all_fields">All Fields<\/option>/)
      expect(page.html).to match(/<option value="title">Title<\/option>/)
      expect(page.html).to match(/<option value="subject">Subject<\/option>/)
      expect(page.html).to match(/<option value="description">Collection<\/option>/)
    end
  end

  it 'gets the correct results using the drop down search' do
    visit '/catalog?search_field=title&q=Title One' do
      expect(page).to have_content('1 Catalog Results')
    end

    visit '/catalog?search_field=subject&q=Minitest' do
      expect(page).to have_content('1 Catalog Results')
    end

    visit '/catalog?search_field=collection&q=photographs' do
      expect(page).to have_content('2 Catalog Results')
    end

    visit '/catalog?search_field=collection&q=unicorn' do
      expect(page).to have_content('No Results found')
    end
  end

  it 'has correct sorting behavior for title' do
    visit '/catalog?q=&search_field=all_fields&sort=title_alpha_numeric_ssort+asc' do
      expect(page).to have_content('1. Title One')
    end

    visit '/catalog?q=&search_field=all_fields&sort=title_alpha_numeric_ssort+desc' do
      expect(page).to have_content('1. Title Two')
    end
  end

  it 'displays a list of collections the record belongs to' do
    visit '/catalog?q=work&search_field=all_fields' do
      expect(page).to have_link('Hathaway Manuscripts', href: 'catalog/37sh8000zzaa-89112')
      expect(page).to have_link('Allan (Maud) Papers. Collection 2038', href: 'catalog/ps4gn100zz-89112')
      expect(page).to have_link('E.F. Raynes Plante Autograph Albums (1914-1918)', href: 'catalog/k13t1n-89112')
      expect(page).to have_link('Photographic Collection', href: 'jdpmdc-89112')
    end
  end
end
