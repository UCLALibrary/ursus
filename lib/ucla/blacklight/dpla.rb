# frozen_string_literal: true
require 'builder'

# This module provides DPLA export based on the solr document's semantic values
module Ucla::Blacklight::Dpla
  def self.extended(document)
    # Register our exportable formats
    Ucla::Blacklight::Dpla.register_export_formats(document)
  end

  def self.register_export_formats(document)
    document.will_export_as(:xml)
    document.will_export_as(:dpla_xml, "text/xml")
    document.will_export_as(:oai_dpla_xml, "text/xml")
  end

  def dc_field_names
    [:contributor, :coverage, :creator, :date, :description, :format, :identifier, :language, :publisher, :relation, :rights, :source, :subject, :title, :type]
  end

  def dcterms_field_names
    [:alternative]
  end

  def edm_field_names
    [:object, :isShownAt, :hasType, :dataProvider]
  end

  def dpla_field_names
    dc_field_names + dcterms_field_names + edm_field_names
  end

  # dublin core elements are mapped against the #dublin_core_field_names whitelist.
  def export_as_oai_dpla_xml
    xml = Builder::XmlMarkup.new
    xml.tag!("oai_dpla:dpla ",
             'xmlns:oai_dpla' => "https://ursus-dev.library.ucla.edu/oai_dpla/",
             'xmlns:dc' => "http://purl.org/dc/elements/1.1/",
             'xmlns:dcterms' => "http://purl.org/dc/terms/",
             'xmlns:edm' => "http://www.europeana.eu/schemas/edm/",
             'xmlns:xsi' => "http://www.w3.org/2001/XMLSchema-instance",
             'xsi:schemaLocation' => %(https://ursus-dev.library.ucla.edu/oai_dpla/ https://ursus-dev.library.ucla.edu/oai_dpla/oai_dpla.xsd)) do
      to_semantic_values("dpla").select { |field, _values| dpla_field_name? field  }.each do |field, values|
        Array.wrap(values).each do |v|
          xml.tag! "#{field_prefix(field)}:#{field}", v
        end
      end
    end
    xml.target!
  end

  alias_method :to_oai_dpla, :export_as_oai_dpla_xml
  alias_method :export_as_xml, :export_as_oai_dpla_xml
  alias_method :export_as_dpla_xml, :export_as_oai_dpla_xml

  private

  def field_prefix(field)
    return "dc" if dc_field_name? field
    return "edm" if edm_field_name? field
    return "dcterms" if dcterms_field_name? field
    return ""
  end

  def dc_field_name? field
    dc_field_names.include? field.to_sym
  end

  def dcterms_field_name? field
    dcterms_field_names.include? field.to_sym
  end

  def edm_field_name? field
    edm_field_names.include? field.to_sym
  end

  def dpla_field_name? field
    dpla_field_names.include? field.to_sym
  end
end
