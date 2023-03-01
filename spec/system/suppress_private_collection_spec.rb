# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Search results page', type: :system, js: true do
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
      has_model_ssim: ['Collection'],
      accessControl_ssim: ['7b1af782-af1f-46a6-9bd2-b53be0f1bb68'],
      title_tesim: ['Zen and the Art of Motorcycle Maintenance: An Inquiry Into Values'],
      collection_type_gid_ssim: ['gid://californica/hyrax-collectiontype/1'],
      local_identifier_ssm: ['Collection 686'],
      normalized_date_tesim: ['1937/1983'],
      photographer_tesim: ['Bennett, Walter E. (Walter Edward), 1921-1995'],
      repository_tesim: ['University of California, Los Angeles. Library Special Collections'],
      services_contact_ssm: ['UCLA'],
      human_readable_resource_type_tesim: ['still image'],
      description_tesim: ['description'],
      rights_statement_tesim: ['http://vocabs.library.ucla.edu/rights/copyrighted'],
      date_created_tesim: ['1937-1983'],
      extent_tesim: ['still image'],
      thumbnail_path_ss: '/assets/collection-a38b932554788aa578debf2319e8c4ba8a7db06b3ba57ecda1391a548a4b6e0a.png',
      visibility_ssi: 'restricted',
      read_access_group_ssim: ['private'],
      ursus_id_ssi: '21198-zz00011f8m',
      human_readable_type_tesim: ['Collection'],
      license_tesim: ['https://creativecommons.org/licenses/by/4.0/'],
      medium_tesim: ['b&w negative']
    }
  end

  before do
    solr = Blacklight.default_index.connection
    solr.add(collection_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
    allow_any_instance_of(IiifService).to receive(:src).and_return('https://p-w-dl-viewer01.library.ucla.edu/#?manifest=/manifest.json')
  end

  it 'displays the metadata' do
    visit "/catalog/#{ark}"
    expect(page).to_not have_content 'Zen and the Art of Motorcycle Maintenance: An Inquiry Into Values'
    expect(page).to_not have_content 'Local identifier: Collection 686'
    expect(page).to_not have_content 'Description: description'
  end

  it 'displays headings' do
    visit "/catalog/#{ark}"
    expect(page).to_not have_content 'Item Overview'
    expect(page).to_not have_content 'Notes'
    expect(page).to_not have_content 'Physical Description'
    expect(page).to_not have_content 'Keywords'
    expect(page).to_not have_content 'Find This Item'
    expect(page).to_not have_content 'Access Condition'
  end
end
