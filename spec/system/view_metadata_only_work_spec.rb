# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "View a metadata-only Work", js: true do
  before do
    solr = Blacklight.default_index.connection
    solr.add([work_with_discovery_visibility, work_with_open_visibility])
    solr.commit
  end

  let(:discovery_work_ark) { 'ark:/123/111' }
  let(:discovery_work_solr_id) { discovery_work_ark.sub('ark:/', '').sub('/', '-').reverse }
  let(:open_work_ark) { 'ark:/123/222' }
  let(:open_work_solr_id) { open_work_ark.sub('ark:/', '').sub('/', '-').reverse }

  let(:work_with_discovery_visibility) do
    {
      id: discovery_work_solr_id,
      ark_ssi: discovery_work_ark,
      discover_access_group_ssim: ["public"],
      read_access_group_ssim: ["public"],
      edit_access_group_ssim: ["admin"],
      has_model_ssim: ['Work'],
      iiif_manifest_url_ssi: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
      title_tesim: ['Work with Discovery Access']
    }
  end

  let(:work_with_open_visibility) do
    {
      id: open_work_solr_id,
      ark_ssi: open_work_ark,
      edit_access_group_ssim: ["admin"],
      has_model_ssim: ['Work'],
      iiif_manifest_url_ssi: 'https://wellcomelibrary.org/iiif/b18035723/manifest',
      read_access_group_ssim: ["public"],
      title_tesim: ['Work with Open Access']
    }
  end

  let(:css_selector_for_uv) { '.media-viewer-container' }

  it 'only displays Universal Viewer if user has at least "read"-level access' do
    # Should see Universal Viewer
    visit "/catalog/#{open_work_ark}"
    expect(page).to have_selector(css_selector_for_uv)

    # Shouldn't see Universal Viewer
    visit "/catalog/#{discovery_work_ark}"
    expect(page).to_not have_selector(css_selector_for_uv)
  end
end
