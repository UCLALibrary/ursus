# frozen_string_literal: true
require 'rails_helper'
require 'cgi'

RSpec.describe 'total number of items in a particular collection', :clean, type: :system, smoketest: true, js: true do
  let(:url) { 'https://ursus.library.ucla.edu/' }
  let(:ladnn_url) { 'https://ursus.library.ucla.edu/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Los+Angeles+Daily+News+Negatives' }
  let(:arkatov_url) { 'https://ursus.library.ucla.edu/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Arkatov+%28James%29+collection' }
  let(:bennett_url) { 'https://ursus.library.ucla.edu/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Bennett+%28Walter+E.%29+Photographic+Collection%2C+1937-1983+%28bulk+1952-1982%29' }
  let(:connell_url) { 'https://ursus.library.ucla.edu/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Connell+%28Will%29+Papers' }
  let(:postcards_url) { 'https://ursus.library.ucla.edu/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Collection+of+California+Postcards' }
  let(:ethiopic_url) { 'https://ursus.library.ucla.edu/catalog?f%5Bmember_of_collections_ssim%5D%5B%5D=Ethiopic+Manuscripts' }

  it 'number of items in the Digital Collection' do
    visit(url)
    click_on 'Search'
    number_of_search_results = page.find(:css, 'h4.catalog-results').text.split.first.to_i
    expect(number_of_search_results).to be > 6000
    expect(number_of_search_results).to eq 6625
    expect(number_of_search_results).to be < 10_000
  end

  it 'number of items in the LADNN Collection' do
    visit(ladnn_url)
    number_of_search_results = page.find(:css, 'h4.catalog-results').text.split.first.to_i
    expect(number_of_search_results).to be > 5000
    expect(number_of_search_results).to eq 5172
    expect(number_of_search_results).to be < 6000
  end

  it 'number of items in in the Arkatov Collection' do
    visit(arkatov_url)
    number_of_search_results = page.find(:css, 'h4.catalog-results').text.split.first.to_i
    expect(number_of_search_results).to be > 800
    expect(number_of_search_results).to eq 840
    expect(number_of_search_results).to be < 900
  end

  it 'number of items in the Bennett Collection' do
    visit(bennett_url)
    number_of_search_results = page.find(:css, 'h4.catalog-results').text.split.first.to_i
    expect(number_of_search_results).to be > 75
    expect(number_of_search_results).to eq 79
    expect(number_of_search_results).to be < 80
  end

  it 'number of items in the Connell Collection' do
    visit(connell_url)
    number_of_search_results = page.find(:css, 'h4.catalog-results').text.split.first.to_i
    expect(number_of_search_results).to be > 500
    expect(number_of_search_results).to eq 502
    expect(number_of_search_results).to be < 550
  end

  it 'number of items in the Ethiopic Manuscripts Collection' do
    visit(ethiopic_url)
    number_of_search_results = page.find(:css, 'h4.catalog-results').text.split.first.to_i
    expect(number_of_search_results).to be > 1
    expect(number_of_search_results).to eq 5
    expect(number_of_search_results).to be < 10
  end

  it 'number of items in the Postcard Collection' do
    visit(postcards_url)
    number_of_search_results = page.find(:css, 'h4.catalog-results').text.split.first.to_i
    expect(number_of_search_results).to be > 15
    expect(number_of_search_results).to eq 20
    expect(number_of_search_results).to be < 25
  end
end
