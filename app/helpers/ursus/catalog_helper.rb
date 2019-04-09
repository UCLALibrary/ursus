# frozen_string_literal: true
module Ursus
  module CatalogHelper
    ##
    # Render the thumbnail, if available, for a document and
    # link it to the document record.
    #
    # @param [SolrDocument] document
    # @param [Hash] image_options to pass to the image tag
    # @param [Hash] url_options to pass to #link_to_document
    # @return [String]
    def render_thumbnail_tag(document, image_options = {}, url_options = {})
      alt_title = document["title_tesim"][0]
      image_options[:alt] = alt_title
      index_presenter(document).thumbnail.thumbnail_tag(image_options, url_options)
    end
    deprecation_deprecate render_thumbnail_tag: "Use IndexPresenter#thumbnail.thumbnail_tag"

    # Render value for a document's field as a truncate description
    # div. Arguments come from Blacklight::DocumentPresenter's
    # get_field_values method
    # @param [Hash] args from get_field_values
    def render_truncated_description(args)
      content_tag :div, class: 'truncate-description' do
        markup = args[:value][0] + link_to("View More", '#', class: 'btn btn-default view-btn').to_s
        return markup.html_safe
      end
    end
  end
end
