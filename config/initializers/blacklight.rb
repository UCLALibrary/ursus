# frozen_string_literal: true
ActiveSupport::Reloader.to_prepare do
  Blacklight::Rendering::Pipeline.operations = [
    AutoLink,
    Blacklight::Rendering::HelperMethod,
    Blacklight::Rendering::LinkToFacet,
    Blacklight::Rendering::Microdata,
    CustomJoin
  ]
end
