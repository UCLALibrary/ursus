# frozen_string_literal: true
module Ursus
  class ThumbnailPresenter < Blacklight::ThumbnailPresenter
    ##
    # Render the thumbnail, if available, for a document and
    # link it to the document record.
    #
    # @param [Hash] image_options to pass to the image tag
    # @param [Hash] url_options to pass to #link_to_document
    # @return [String]
    def thumbnail_tag(image_options = {}, url_options = {})
      return if document['visibility_ssi'] == 'discovery'

      alt_title = Array.wrap(document["title_tesim"])[0]
      image_options[:alt] = alt_title

      value = thumbnail_value(image_options)
      return value if value.nil? || url_options[:suppress_link]

      view_context.link_to_document document, value, url_options
    end

    def thumbnail_value_from_document
      super || thumbnail_default
    end

    def thumbnail_default
      resource_type_id = document['resource_type_ssim'] || document['resource_type_tesim'] # We're indexing as _tesim, but should change to _ssim

      # based on resource type ids from https://github.com/UCLALibrary/californica/blob/main/config/authorities/resource_types.yml
      case resource_type_id.to_a.first.to_s.sub(/^http\:\/\/id\.loc\.gov\/vocabulary\/resourceTypes\//, '')
      when 'mov' # moving image
        'https://static.library.ucla.edu/video_icon.svg'
      when 'aud', 'aum', 'aun' # sound recording types
        'https://static.library.ucla.edu/audio_icon.svg'
      end
    end
  end
end
