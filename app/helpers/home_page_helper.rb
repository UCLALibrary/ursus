# frozen_string_literal: true

module HomePageHelper
  # Use the ark to find the record, and then return a link to that record.
  def link_to_featured_work(link_text, ark)
    # Use ssim, not tesim, for an exact match
    query = "identifier_ssim:#{ark}"

    solr = Blacklight.default_index.connection
    response = solr.get "select", params: { q: [query], rows: 1 }
    record = response['response']['docs'].first

    link_path = record ? solr_document_path(record['id']) : blank_search_path

    link_to link_text, link_path
  end

  def blank_search_path
    search_catalog_path(search_field: 'all_fields', q: '')
  end
end
