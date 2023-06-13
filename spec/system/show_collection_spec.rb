
# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'View a Collection', type: :system, js: true do
  let(:ark) { 'ark:/21198/zz00011f8m' }
  let(:solr_id) { ark.sub('ark:/', '').sub('/', '-').reverse }
  let(:services_contact) do
    'UCLA Charles E. Young Research Library Department of Special Collections Phone: (310)825-4988'
  end
  let(:description) do
    'Walter E. Bennett (1921-1995) was the first salaried photographer for Time, where he worked from 1952 to 1982.'
  end
  let(:collection_attributes) do
    {
      id: solr_id,
      ark_ssi: ark,
      content_disclaimer_ssm: ['Content Disclaimer'],
      has_model_ssim: ['Collection'],
      accessControl_ssim: ['7b1af782-af1f-46a6-9bd2-b53be0f1bb68'],
      title_tesim: ['Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'],
      collection_type_gid_ssim: ['gid://californica/hyrax-collectiontype/1'],
      local_identifier_ssim: ['Collection 686'],
      normalized_date_tesim: ['1937/1983'],
      photographer_tesim: ['Bennett, Walter E. (Walter Edward), 1921-1995'],
      repository_tesim: ['University of California, Los Angeles. Library Special Collections'],
      services_contact_ssm: ['UCLA'],
      human_readable_resource_type_tesim: ['still image'],
      description_tesim: ['description'],
      summary_tesim: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'],
      rights_statement_tesim: ['http://vocabs.library.ucla.edu/rights/copyrighted'],
      date_created_tesim: ['1937-1983'],
      extent_tesim: ['still image'],
      thumbnail_path_ss: '/assets/collection-a38b932554788aa578debf2319e8c4ba8a7db06b3ba57ecda1391a548a4b6e0a.png',
      visibility_ssi: 'open',
      read_access_group_ssim: ['public'],
      ursus_id_ssi: '21198-zz00011f8m',
      human_readable_type_tesim: ['Collection'],
      license_tesim: ['https://creativecommons.org/licenses/by/4.0/'],
      medium_tesim: ['b&w negative']
    }
  end

  let(:work_1_attributes) { WORK_A }

  let(:work_2_attributes) { WORK_B }

  let(:work_3_attributes) { WORK_C }

  let(:work_4_attributes) { WORK_D }

  let(:work_5_attributes) { WORK_E }

  before do
    solr = Blacklight.default_index.connection
    solr.add(collection_attributes)
    solr.add(work_1_attributes)
    solr.add(work_2_attributes)
    solr.add(work_3_attributes)
    solr.add(work_4_attributes)
    solr.add(work_5_attributes)
    solr.commit
    # allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
    # allow_any_instance_of(IiifService).to receive(:src).and_return('/uv/uv.html#?manifest=/manifest.json')
  end

  it 'displays the metadata' do
    visit "/catalog/#{ark}"

    # expect(page).to have_selector('.primary-metadata')
    # expect(page).to have_selector('.secondary-metadata')
    # expect(page.find('div.secondary-metadata dd.blacklight-services_contact_ssm').text).to eq 'UCLA'
    # expect(page.find('div.secondary-metadata dd.blacklight-local_identifier_ssim').text).to eq 'Collection 686'

    expect(page).to have_content 'Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'
    expect(page).to have_content 'LOCAL IDENTIFIER  Collection 686'
  end

  it 'displays the schema.org values' do
    visit "/catalog/#{ark}"
    expect(page.find('div[itemtype = "http://schema.org/Collection"]')['itemid']).to end_with 'catalog/ark:/21198/zz00011f8m'
    expect(page.find('div > p[itemprop]')['itemprop']).to have_content 'abstract'
    expect(page.find('div[itemprop]')['itemprop']).to have_content 'collectionSize'
  end

  it 'displays headings' do
    visit "/catalog/#{ark}"
    expect(page).to have_content 'Content Disclaimer'
    expect(page).to have_content 'Collection Overview'
    expect(page).to have_content 'Contact'
    expect(page).to have_content 'Find this Collection'
    expect(page).to have_content 'About this Collection'
  end
end
