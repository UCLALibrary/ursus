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
  # https://bepress.com/reference_guide_dc/digital-commons-oai-harvesting/
  # DublinCore uses the semantic field mappings below to assemble an OAI-compliant Dublin Core document
  # Semantic mappings of solr stored fields. Fields may be multi or single valued.
  # See Blacklight::Solr::Document::ExtendableClassMethods#field_semantics
  # and Blacklight::Solr::Document#to_semantic_values
  # https://github.com/TuftsUniversity/tdl_on_hyrax/blob/master/app/models/solr_document.rb

  field_semantics.merge!(
    title: 'title_tesim',
    identifier: ['local_identifier_ssm', 'opac_url_ssi', 'oclc_ssi', 'ark_ssi'],
    creator: 'creator_tesim',
    contributor: [
      'author_tesim', 'editor_tesim', 'photographer_tesim', 'architect_tesim',
      'illuminator_tesim', 'illustrator_tesim', 'engraver_tesim', 'printmaker_tesim',
      'scribe_tesim', 'translator_tesim', 'rubricator_tesim', 'calligrapher_tesim',
      'commentator_tesim', 'lyricist_tesim', 'composer_tesim'
    ],
    date: ['date_created_tesim', 'normalized_date_sim'],
    publisher: ['place_of_origin_tesim', 'publiisher_tesim'],
    language: 'language_tesim',
    provenance: 'provenance_tesim',
    format: ['format_tesim', 'support_tesim', 'medium_tesim', 'page_layout_ssim'],
    description: ['binding_note_ssi', 'condition_note_ssi', 'foliation_tesim', 'illustrations_note_tesim', 'funding_note_tesim', 'note_tesim'],
    subject: ['subject_tesim', 'subject_topic_tesim', 'named_subject_tesim', 'subject_geo_tesim'],
    type: 'resource_type_tesim',
    rights: ['rights_country_tesim', 'services_contact_ssm']
    # source: 'collection_native_',
    # format: 'book_format_'
    # rights: 'rights_statement_', # not local_rights
    # identifier: 'filename_',
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
