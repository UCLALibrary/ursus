# frozen_string_literal: true

class IiifService
  def src(request, document)
    "#{request&.base_url}/uv/uv.html#?manifest=#{Rails.application.config.iiif_url}/#{document.id}/manifest"
  end
end
