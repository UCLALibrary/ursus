# frozen_string_literal: true

class IiifService
  def src(request, document)
    "#{request&.base_url}/uv/uv.html#?manifest=#{Rails.application.config.iiif_url}/#{document.id}/manifest"
  end

  def iiif_manifest_url(document)
    if Flipflop.use_manifest_store? && document[:iiif_manifest_url_ssi]
      document[:iiif_manifest_url_ssi]
    else
      "#{Rails.application.config.iiif_url}/#{document.id}/manifest"
    end
  end
end
