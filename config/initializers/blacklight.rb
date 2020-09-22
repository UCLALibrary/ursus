# frozen_string_literal: true
Blacklight::Rendering::Pipeline.operations = [Blacklight::Rendering::HelperMethod,
                                              Blacklight::Rendering::LinkToFacet,
                                              Blacklight::Rendering::Microdata,
                                              CustomJoin]
