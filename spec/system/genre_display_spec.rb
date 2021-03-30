# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'The genre field of the item display view', :clean, type: :system do
  before do
    solr = Blacklight.default_index.connection
    solr.add(work_attributes)
    solr.commit
  end

  let(:ark) { 'ark:/123/genre_display' }
  let(:solr_id) { ark.sub('ark:/', '').sub('/', '-').reverse }
  let(:work_attributes) do
    {
      id: solr_id,
      ark_ssi: ark,
      genre_tesim: ['genre1', 'genre2', 'genre3'],
      read_access_group_ssim: ["public"],
      has_model_ssim: ['Work']
    }
  end

  it 'lists each genre on its own line, as a link to a search for that genre' do
    visit("/catalog/#{ark}")

    page.within('dd.blacklight-genre_tesim') do
      expect(all(:css, 'br').length).to eq 2
      expect(page).to have_link('genre1', href: '/catalog?f%5Bgenre_sim%5D%5B%5D=genre1')
      expect(page).to have_link('genre2', href: '/catalog?f%5Bgenre_sim%5D%5B%5D=genre2')
      expect(page).to have_link('genre3', href: '/catalog?f%5Bgenre_sim%5D%5B%5D=genre3')
    end
  end
end
