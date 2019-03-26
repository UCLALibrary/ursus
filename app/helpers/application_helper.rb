# frozen_string_literal: true
module ApplicationHelper
  def render_thumbnail(document, _options)
    return unless document[:file_id].present?
    image_tag(
      "#{image_server}/#{document.id}/#{document.first(:file_id)}.png"
    )
  end
end
