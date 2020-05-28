# frozen_string_literal: true
require 'rails_helper'

RSpec.feature "View a metadata-only Work", js: true do
  before do
    solr = Blacklight.default_index.connection
    solr.add([work_with_discovery_visibility, work_with_open_visibility])
    solr.commit
  end

  let(:discovery_work_id) { '111-321' }
  let(:open_work_id) { '222-321' }

  let(:work_with_discovery_visibility) do
    {
      id: discovery_work_id,
      ark_ssi: ['ark:/123/111'],
      discover_access_group_ssim: ["public"],
      edit_access_group_ssim: ["admin"],
      has_model_ssim: ['Work'],
      iiif_manifest_url_ssi: 'https://iiif.server/url/manifest',
      title_tesim: ['Work with Discovery Access']
    }
  end

  let(:work_with_open_visibility) do
    {
      id: open_work_id,
      ark_ssi: ['ark:/123/222'],
      edit_access_group_ssim: ["admin"],
      has_model_ssim: ['Work'],
      iiif_manifest_url_ssi: 'https://iiif.server/url/manifest',
      read_access_group_ssim: ["public"],
      title_tesim: ['Work with Open Access']
    }
  end

  let(:css_selector_for_uv) { '.media-viewer-container' }

  it 'only displays Universal Viewer if user has at least "read"-level access' do
    # Should see Universal Viewer
    visit solr_document_path(open_work_id)
    expect(page).to have_selector(css_selector_for_uv)

    # Shouldn't see Universal Viewer
    visit solr_document_path(discovery_work_id)
    expect(page).to_not have_selector(css_selector_for_uv)
  end
end
