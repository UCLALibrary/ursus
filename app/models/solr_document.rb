# frozen_string_literal: true
class SolrDocument
  include Blacklight::Solr::Document
  include Blacklight::Gallery::OpenseadragonSolrDocument

  self.unique_key = 'ark_ssi'

  # Email uses the semantic field mappings below to generate the body of an email.
  SolrDocument.use_extension(Blacklight::Document::Email)

  # SMS uses the semantic field mappings below to generate the body of an SMS email.
  SolrDocument.use_extension(Blacklight::Document::Sms)

  # DublinCore uses the semantic field mappings below to assemble an OAI-compliant Dublin Core document
  # Semantic mappings of solr stored fields. Fields may be multi or
  # single valued. See Blacklight::Document::SemanticFields#field_semantics
  # and Blacklight::Document::SemanticFields#to_semantic_values
  # Recommendation: Use field names from Dublin Core
  use_extension(Blacklight::Document::DublinCore)

  def export_as_ucla_citation_txt
    image = self
    title = (image[:title_tesim].to_a.first || 'Untitled')
    collection = (image[:dlcs_collection_name_ssm].to_a.first || 'No collection')
    resource_type = (image[:resource_type_tesim].to_a.first || 'unknown type')
    imageid = image[:id]
    "#{title}. [#{resource_type}]. UCLA Library Digital Collections. #{collection}. https://#{ENV['RAILS_HOST']}/catalog/#{imageid}"
  end
end
