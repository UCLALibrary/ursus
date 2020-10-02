# frozen_string_literal: true
class SolrDocument
  include Blacklight::Solr::Document
  include BlacklightOaiProvider::SolrDocument

  include Blacklight::Gallery::OpenseadragonSolrDocument

  # self.unique_key = 'id'

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

  # Dublin core fields of OAI
  # http://localhost:3003/catalog/oai?verb=ListRecords&metadataPrefix=oai_dc
  # https://github.com/projectblacklight/blacklight_oai_provider

  field_semantics.merge!(
    title: "title_tesim",
    identifier: "local_identifier_ssm",
    identifier: "opac_url_ssi'",
    identifier: "oclc_ssi",
    identifier: "ark_ssi",
    creator: "creator_tesim",
    contributor: "author_tesim",
    contributor: "editor_tesim",
    contributor: "photographer_tesim",
    contributor: "architect_tesim",
    contributor: "illuminator_tesim",
    contributor: "illustrator_tesim",
    contributor: "engraver_tesim",
    contributor: "printmaker_tesim",
    contributor: "scribe_tesim",
    contributor: "translator_tesim",
    contributor: "rubricator_tesim",
    contributor: "calligrapher_tesim",
    contributor: "commentator_tesim",
    contributor: "lyricist_tesim",
    contributor: "composer_tesim",
    date: "date_created_tesim",
    date: "normalized_date_sim",
    publisher: "place_of_origin_tesim",
    publisher: "publiisher_tesim",
    language: "language_tesim",
    # source: "collection_native_",
    description: "description_tesim",
    description: "caption_tesim",
    description: "contents_note_tesim",
    description: "colophon_tesim",
    provenance: "provenance_tesim",
    description: "note_tesim",
    format: "format_tesim",
    # format: "book_format_",
    format: "support_tesim",
    format: "medium_tesim",
    format: "page_layout_ssim",
    description: "binding_note_ssi",
    description: "condition_note_ssi",
    description: "foliation_tesim",
    description: "illustrations_note_tesim",
    subject: "subject_tesim",
    subject: "subject_topic_tesim",
    subject: "named_subject_tesim",
    subject: "subject_geo_tesim",
    type: "resource_type_tesim",
    # rights: "rights_statement_", # not local_rights
    rights: "rights_country_tesim",
    rights: "services_contact_ssm",
    description: "funding_note_tesim"
    # identifier: "filename_",
  )

  def export_as_ucla_citation_txt
    image = self
    title = (image[:title_tesim].to_a.first || 'Untitled')
    collection = (image[:dlcs_collection_name_ssm].to_a.first || 'No collection')
    resource_type = (image[:resource_type_tesim].to_a.first || 'unknown type')
    imageid = image[:id]
    "#{title}. [#{resource_type}]. UCLA Library Digital Collections. #{collection}. https://#{ENV['RAILS_HOST']}/catalog/#{imageid}"
  end
end
