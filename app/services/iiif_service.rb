# frozen_string_literal: true

class IiifService
  def src(request, document)
    # SINAI
    if Flipflop.sinai?
      "#{request&.base_url}/mirador.html#?manifest=#{CGI.escape(iiif_manifest_url(document))}"
    # URSUS
    else
      # CANVAS
      if request.query_parameters.include?('cv')
        if ENV['RAILS_HOST'] == 'ursus-test' || ENV['RAILS_HOST'] == 'localhost'
          "https://t-w-dl-viewer01.library.ucla.edu/uv.html#?cv=#{request.query_parameters['cv']}&manifest=#{CGI.escape(iiif_manifest_url(document))}"
        elsif ENV['RAILS_HOST'] == 'ursus-dev'
          "https://d-w-dl-viewer01.library.ucla.edu/uv.html#?cv=#{request.query_parameters['cv']}&manifest=#{CGI.escape(iiif_manifest_url(document))}"
        elsif ENV['RAILS_HOST'] == 'ursus-stage'
          "https://s-w-dl-viewer01.library.ucla.edu/uv.html#?cv=#{request.query_parameters['cv']}&manifest=#{CGI.escape(iiif_manifest_url(document))}"
        elsif ENV['RAILS_HOST'] == 'ursus'
          "https://p-w-dl-viewer01.library.ucla.edu/uv.html#?cv=#{request.query_parameters['cv']}&manifest=#{CGI.escape(iiif_manifest_url(document))}"
        end
      else
        if ENV['RAILS_HOST'] == 'ursus-test' || ENV['RAILS_HOST'] == 'localhost'
          "https://t-w-dl-viewer01.library.ucla.edu/uv.html#?manifest=#{CGI.escape(iiif_manifest_url(document))}"
        elsif ENV['RAILS_HOST'] == 'ursus-dev'
          "https://d-w-dl-viewer01.library.ucla.edu/uv.html#?manifest=#{CGI.escape(iiif_manifest_url(document))}"
        elsif ENV['RAILS_HOST'] == 'ursus-stage'
          "https://s-w-dl-viewer01.library.ucla.edu/uv.html#?manifest=#{CGI.escape(iiif_manifest_url(document))}"
        elsif ENV['RAILS_HOST'] == 'ursus'
          "https://p-w-dl-viewer01.library.ucla.edu/uv.html#?manifest=#{CGI.escape(iiif_manifest_url(document))}"
        end
      end
    end
  end

  def iiif_manifest_url(document)
    if Flipflop.use_manifest_store? && document[:iiif_manifest_url_ssi]
      document[:iiif_manifest_url_ssi]
    else
      "#{Rails.application.config.iiif_url}/#{document.id}/manifest"
    end
  end
end
