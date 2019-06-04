# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Search results page', type: :system, js: true do
  let(:id) { "m8f11000zz-89112" }
  let(:services_contact) do
    "UCLA Charles E. Young Research Library Department of Special Collections Phone: (310)825-4988"
  end
  let(:description) do
    "Walter E. Bennett (1921-1995) was the first salaried photographer for Time, where he worked from 1952 to 1982."
  end
  let(:collection_attributes) do
    {
      id: id,
      has_model_ssim: [
        "Collection"
      ],
      accessControl_ssim: [
        "7b1af782-af1f-46a6-9bd2-b53be0f1bb68"
      ],
      title_tesim: [
        "Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)"
      ],
      collection_type_gid_ssim: [
        "gid://californica/hyrax-collectiontype/1"
      ],
      ark_ssi: "ark:/21198/zz00011f8m",
      local_identifier_ssm: [
        "Collection 686"
      ],
      normalized_date_tesim: [
        "1937/1983"
      ],
      photographer_tesim: [
        "Bennett, Walter E. (Walter Edward), 1921-1995"
      ],
      repository_tesim: [
        "University of California, Los Angeles. Library Special Collections"
      ],
      services_contact_ssm: [services_contact],
      human_readable_resource_type_tesim: [
        "still image"
      ],
      description_tesim: [
        description
      ],
      rights_statement_tesim: [
        "http://vocabs.library.ucla.edu/rights/copyrighted"
      ],
      date_created_tesim: [
        "1937-1983"
      ],
      thumbnail_path_ss: "/assets/collection-a38b932554788aa578debf2319e8c4ba8a7db06b3ba57ecda1391a548a4b6e0a.png",
      visibility_ssi: "open",
      ursus_id_ssi: "21198-zz00011f8m",
      human_readable_type_tesim: [
        "Collection"
      ],
      license_tesim: ['https://creativecommons.org/licenses/by/4.0/']
    }
  end

  before do
    solr = Blacklight.default_index.connection
    solr.add(collection_attributes)
    solr.commit
    allow(Rails.application.config).to receive(:iiif_url).and_return('https://example.com')
    allow_any_instance_of(IiifService).to receive(:src).and_return('/uv/uv.html#?manifest=/manifest.json')
  end

  it 'displays the metadata' do
    visit solr_document_path(id)

    expect(page).to have_selector('.primary-metadata')
    expect(page).to have_selector('.secondary-metadata')
    expect(page.find('div.secondary-metadata dd.blacklight-services_contact_ssm').text).to eq services_contact
    expect(page.find('div.secondary-metadata dd.blacklight-local_identifier_ssm').text).to eq "Collection 686"

    expect(page).to have_content "Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)"
    expect(page).to have_content 'Local identifier: Collection 686'
    expect(page).to have_content "Description: #{description}"
  end

  context 'license' do
    it 'displays the creative commons text and logo when there is a cc license' do
      visit solr_document_path(id)
      expect(page).to have_content 'License'
      expect(page).to have_link 'Creative Commons Attribution 4.0 International License'
    end
  end
end
