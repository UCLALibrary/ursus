# frozen_string_literal: true

class OaiModsArce < OAI::Provider::Metadata::Format
  def initialize
    @prefix = 'mods_arce'
    @element_namespace = 'mods'
    @namespace = 'http://www.loc.gov/mods/v3'
    @schema = 'https://www.loc.gov/standards/mods/v3/mods-3-8.xsd'
  end

  def header_specification
    {
    }
  end
end
