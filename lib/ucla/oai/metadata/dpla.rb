module Ucla::Oai::Metadata

  # Simple implementation of the DPLA metadata format.
  class Dpla < OAI::Provider::Metadata::Format

    def initialize
      @prefix = 'oai_dpla'
      @schema =  "ursus-dev.library.ucla.edu/oai_dpla/oai_dpla.xsd"
      @namespace = 'http://www.openarchives.org/OAI/2.0/'
      @element_namespace = 'dpla '
      @fields = [ :isShownAt, :object, :hasType, :dataProvider ]
    end

    def header_specification
      {
        'xmlns:oai_dpla' =>  "https://ursus-dev.library.ucla.edu/oai_dpla/",
        'xmlns:dc' => "http://purl.org/dc/elements/1.1/",
        'xmlns:dcterms' => "http://purl.org/dc/terms/",
        'xmlns:edm' => "http://www.europeana.eu/schemas/edm/",
        'xmlns:xsi' => "http://www.w3.org/2001/XMLSchema-instance",
        'xsi:schemaLocation' =>
          %{https://ursus-dev.library.ucla.edu/oai_dpla/ https://ursus-dev.library.ucla.edu/oai_dpla/oai_dpla.xsd}.gsub(/\s+/, ' ')
      }
    end

  end
end
