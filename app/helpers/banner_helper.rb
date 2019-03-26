# frozen_string_literal: true

module BannerHelper
  def render_banner_tag(document)
    return unless collection?(document)
    img_path = get_img_path(document['id'])
    return unless img_path
    "<img width='800' alt='Collection banner' height='100' src='#{img_path}'/>".html_safe # rubocop:disable Rails/OutputSafety
  end

  def collection?(document)
    document['has_model_ssim'][0] == 'Collection'
  end

  def get_img_path(collection_id)
    branding_info = get_branding_info(collection_id)
    banner_path = branding_info[1]
    "#{Rails.configuration.thumbnail_url}/#{banner_path}"
  end

  def branding_info_url(collection_id)
    "#{Rails.configuration.thumbnail_url}/branding_info/#{collection_id}.json"
  end

  def get_branding_info(collection_id)
    response = HTTParty.get(branding_info_url(collection_id))
    branding_info_json = response.parsed_response["local_path"]
    branding_info_json.split('/public/')
  end
end
