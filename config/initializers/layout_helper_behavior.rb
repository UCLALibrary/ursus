# frozen_string_literal: true
# Methods added to this helper will be available to all templates in the hosting
# application
module Blacklight
  # A module for useful methods used in layout configuration
  module UrsusLayoutHelperBehavior
    ##
    # Classes added to a document's show content div
    # @return [String]
    def show_content_classes
      "#{main_content_classes} show-document"
    end

    ##
    # Classes added to a document's sidebar div
    # @return [String]
    def show_sidebar_classes
      sidebar_classes
    end

    ##
    # Classes used for sizing the main content of a Blacklight page
    # @return [String]
    def main_content_classes
      'col-md-12 col-sm-12 col-lg-9 col-xs-12 col-xl-9'
    end

    ##
    # Classes used for sizing the sidebar content of a Blacklight page
    # @return [String]
    def sidebar_classes
      'page-sidebar col-md-12 col-sm-12 col-lg-3 col-xs-12 col-xl-3'
    end

    ##
    # Class used for specifying main layout container classes. Can be
    # overwritten to return 'container-fluid' for Bootstrap full-width layout
    # @return [String]
    def container_classes
      'main-content-container container-constrained'
    end
  end
end
