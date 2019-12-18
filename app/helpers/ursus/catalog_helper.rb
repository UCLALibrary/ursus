# coding: utf-8
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
      truncated_output = String.new
      content_tag :div, class: 'truncate-description' do
        description = args[:value].first
        button = "<span class='view-more' href>Read More <div class='down-arrow'>&raquo;</div></span></br>"
        truncated_output << "<div class='description'>#{description}</div>#{button}</br>"
        # return truncated_output.html_safe
        return description
      end
    end
  end
end
