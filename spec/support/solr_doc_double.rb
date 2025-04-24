# frozen_string_literal: true

module SolrDocDouble
  def doc_double_with_fields_to_render(hsh)
    solr_doc = instance_double("solr_doc")

    allow(solr_doc).to receive(:fields_to_render).and_return(hsh.to_enum)

    solr_doc
  end
end
