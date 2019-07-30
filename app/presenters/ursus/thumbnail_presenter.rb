# frozen_string_literal: true
module Ursus
  module ThumbnailPresenter
    ##
    # Render the thumbnail, if available, for a document and
    # link it to the document record.
    #
    # @param [Hash] image_options to pass to the image tag
    # @param [Hash] url_options to pass to #link_to_document
    # @return [String]
    def thumbnail_tag(image_options = {}, url_options = {})
      alt_title = Array.wrap(document["title_tesim"])[0]
      image_options[:alt] = alt_title

      value = thumbnail_value(image_options)
      return value if value.nil? || url_options[:suppress_link]

      view_context.link_to_document document, value, url_options
    end

    def thumbnail_value_from_document(document)
      document[:thumbnail_url_ss]
    end
  end
end
