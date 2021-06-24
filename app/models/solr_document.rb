# frozen_string_literal: true
class SolrDocument
  include Blacklight::Solr::Document
  include BlacklightOaiProvider::SolrDocument

  include Blacklight::Gallery::OpenseadragonSolrDocument

  def self.add_field_semantics(label, solr_name, schema = nil)
    label = "#{schema}:#{label}" if schema
    field_semantics.merge!(label => Array.wrap(solr_name)) { |_key, old_val, new_val| Array.wrap(old_val) + Array.wrap(new_val) }
  end

  # add collection membership in OAI-PMH feed source element for all schemas
  add_field_semantics('source', 'member_of_collections_ssim')

  self.unique_key = 'ark_ssi'

  def self.find(hyrax_id)
    doc = super(hyrax_id)
    raise Blacklight::Exceptions::RecordNotFound, "SolrDocument #{hyrax_id} has no ARK, and cannot be used in Ursus. Usually this means it is an internal Hyrax object from Californica (eg something permissions-related)." unless doc.id # rubocop:disable Metrics/LineLength -- RecordNotFound isn't really appropriate but will ensure it returns a 404
    doc
  end

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

  # create field semantics hash from oai.yml file
  oai_namespaces = YAML.load_file(File.join(Rails.root.to_s, 'config/oai.yml'))
  oai_namespaces.each do |namespace, properties|
    next if namespace.to_s.casecmp("default").zero?
    if properties["parent_schema"].present? && (parent = oai_namespaces[properties["parent_schema"]]).present?
      properties = parent.deep_merge(properties).reject { |key, _value| key == "parent_schema" }
    end
    properties.each do |property, field_names|
      field_names.each do |field_name|
        add_field_semantics(property, field_name, namespace)
      end
    end
  end

  def to_semantic_values(schema = "dc")
    (@semantic_value_hash ||= {})[schema] ||= self.class.field_semantics.each_with_object(Hash.new([])) do |(key, field_names), hash|
      if (val_schema, attribute = key.split(':')).length == 2
        # Skip this one unless it is in the right schema
        # (or if we are requesting all schemas, or if it is registered without a specific schema)
        next unless schema.blank? || val_schema.blank? || schema.to_s.casecmp(val_schema.to_s.downcase).zero?
        key = attribute
      end

      ##
      # Handles single string field_name or an array of field_names
      value = Array.wrap(field_names).map do |field_name|
        raw_value = send(field_name) if respond_to?(field_name.to_sym)
        raw_value = self[field_name] if raw_value.blank? && self[field_name].present?
        raw_value
      end

      value = value.flatten.compact
      hash[key] = value unless value.empty?
    end
  end

  def sets()
=begin
    Array.wrap([{:solr_field=>"member_of_collection_ids_ssim"}]).map do |field|
      self.fetch(field[:solr_field], []).map do |value|
        byebug
        Ucla::Oai::CollectionSolrSet.new("member_of_collection_ids_ssim:#{value}")
      end
    end.flatten
=end
   Ucla::Oai::CollectionSolrSet.sets_for(self)
  end

  # populates OAI feed
  def permalink(record = self)
    "#{root_url}/catalog/#{record.id}"
  end

  def root_url
    "https://#{ENV['RAILS_HOST']}"
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
