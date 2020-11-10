require 'socket'
# frozen_string_literal: true
class SolrDocument
  include Blacklight::Solr::Document
  include BlacklightOaiProvider::SolrDocument

  include Blacklight::Gallery::OpenseadragonSolrDocument

  def self.add_field_semantics(label,solr_name,schema=nil)
    label = "#{schema}:#{label}" if schema
    field_semantics.merge!(label => Array.wrap(solr_name)) {|key, old_val, new_val| Array.wrap(old_val) + Array.wrap(new_val)}
  end

  # add collection membership in OAI-PMH feed source element for all schemas
  add_field_semantics('source','member_of_collections_ssim')

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
  use_extension(Ucla::Blacklight::Dpla)

  # Dublin core fields of OAI
  # http://localhost:3003/catalog/oai?verb=ListRecords&metadataPrefix=oai_dc
  # https://github.com/projectblacklight/blacklight_oai_provider
  # https://bepress.com/reference_guide_dc/digital-commons-oai-harvesting/
  # DublinCore uses the semantic field mappings below to assemble an OAI-compliant Dublin Core document
  # Semantic mappings of solr stored fields. Fields may be multi or single valued.
  # See Blacklight::Solr::Document::ExtendableClassMethods#field_semantics
  # and Blacklight::Solr::Document#to_semantic_values
  # https://github.com/TuftsUniversity/tdl_on_hyrax/blob/master/app/models/solr_document.rb

=begin
  field_semantics.merge!(
    title: 'title_tesim',
    identifier: ['local_identifier_ssm', 'opac_url_ssi', 'oclc_ssi', 'ark_ssi', 'thumbnail_url_ss'],
    creator: 'creator_tesim',
    contributor: [
      'author_tesim', 'editor_tesim', 'photographer_tesim', 'architect_tesim',
      'illuminator_tesim', 'illustrator_tesim', 'engraver_tesim', 'printmaker_tesim',
      'scribe_tesim', 'translator_tesim', 'rubricator_tesim', 'calligrapher_tesim',
      'commentator_tesim', 'lyricist_tesim', 'composer_tesim'
    ],
    date: ['date_created_tesim', 'normalized_date_sim'],
    publisher: ['place_of_origin_tesim', 'publisher_tesim'],
    language: 'language_tesim',
    provenance: 'provenance_tesim',
    format: ['format_tesim', 'support_tesim', 'medium_tesim', 'page_layout_ssim'],
    description: [
      'binding_note_ssi', 'condition_note_ssi', 'foliation_tesim',
      'illustrations_note_tesim', 'funding_note_tesim', 'note_tesim', 'description_tesim',
      'colophon_tesim', 'toc_tesim', 'caption_tesim', 'contents_note_tesim'
    ],
    subject: ['subject_tesim', 'subject_topic_tesim', 'named_subject_tesim', 'subject_geo_tesim'],
    type: 'resource_type_tesim',
    rights: ['rights_country_tesim', 'services_contact_ssm']
    # source: 'collection_native_',
    # format: 'book_format_'
    # rights: 'rights_statement_', # not local_rights
    # identifier: 'filename_',
  )
=end
  # create field semantics hash from oai.yml file
  oai_namespaces =  YAML.load_file(File.join(Rails.root.to_s,'config/oai.yml'))
  oai_namespaces.each do |namespace, properties|
    next if namespace.to_s.downcase == "default"
    if properties["parent_schema"].present? && (parent = oai_namespaces[properties["parent_schema"]]).present?
      properties = parent.deep_merge(properties).reject{|key,value| key == "parent_schema"}
    end
    properties.each do |property,field_names|
      field_names.each do |field_name|
        add_field_semantics(property, field_name, namespace)
      end
    end
  end

  def to_semantic_values(schema="dc")
    (@semantic_value_hash ||= {})[schema] ||= self.class.field_semantics.each_with_object(Hash.new([])) do |(key, field_names), hash| 

      if (val_schema, attribute = key.split(':')).length == 2
        # Skip this one unless it is in the right schema
        # (or if we are requesting all schemas, or if it is registered without a specific schema)
        next unless schema.blank? || val_schema.blank? || (schema.to_s.downcase == val_schema.to_s.downcase)
        key = attribute
      end
      
      ##
      # Handles single string field_name or an array of field_names
      value = Array.wrap(field_names).map do |field_name| 
        raw_value = self.send(field_name) if self.respond_to?(field_name.to_sym)
        raw_value = self[field_name] if raw_value.blank? and self[field_name].present?
        raw_value
      end
      
      value = value.flatten.compact
      hash[key] = value unless value.empty?
    end
  end

  def permalink(record = self)
    "#{root_url}/catalog/#{record.id}"
  end

  def root_url
    "https://"+Socket.gethostname
  end

  def export_as_ucla_citation_txt
    image = self
    title = (image[:title_tesim].to_a.first || 'Untitled')
    collection = (image[:dlcs_collection_name_ssm].to_a.first || 'No collection')
    resource_type = (image[:resource_type_tesim].to_a.first || 'unknown type')
    imageid = image[:id]
    "#{title}. [#{resource_type}]. UCLA Library Digital Collections. #{collection}. https://#{ENV['RAILS_HOST']}/catalog/#{imageid}"
  end
end
