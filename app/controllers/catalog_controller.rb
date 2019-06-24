# coding: utf-8
# frozen_string_literal: true

require 'solrizer'

class CatalogController < ApplicationController
  include BlacklightRangeLimit::ControllerOverride
  include Blacklight::Catalog
  include Blacklight::AccessControls::Catalog

  # Apply the blacklight-access_controls
  before_action :enforce_show_permissions, only: :show

  include BlacklightHelper

  BREAKS = {
    words_connector: '<br/>',
    two_words_connector: '<br/>',
    last_word_connector: '<br/>'
  }.freeze

  configure_blacklight do |config|
    config.view.gallery.partials = [:gallery]
    # config.view.masonry.partials = [:index]
    # config.view.slideshow.partials = [:index]

    config.show.tile_source_field = :content_metadata_image_iiif_info_ssm
    config.show.partials.insert(1, :openseadragon)
    ## Class for sending and receiving requests from a search index
    # config.repository_class = Blacklight::Solr::Repository
    #
    ## Class for converting Blacklight's url parameters to into request parameters for the search index
    # config.search_builder_class = ::SearchBuilder
    #
    ## Model that maps search index responses to the blacklight response model
    # config.response_model = Blacklight::Solr::Response

    # Do not store searches for anyone since they are not displayed and will fill up the database
    config.crawler_detector = ->(req) { req.env['HTTP_USER_AGENT'] =~ /bot/ }

    ## Default parameters to send to solr for all search-like requests. See also SearchBuilder#processed_parameters
    config.default_solr_params = {
      qt: 'search',
      mm: '100%',
      rows: 10,
      qf: 'title_tesim description_tesim creator_tesim keyword_tesim',
      fq: '{!terms f=has_model_ssim v=Work,Collection}'
    }

    config.show.partials.insert(1, :collection_banner)
    config.show.partials.insert(2, :uv)

    # solr field configuration for document/show views
    config.index.title_field = ::Solrizer.solr_name('title', :stored_searchable)
    config.index.display_type_field = ::Solrizer.solr_name('has_model', :symbol)
    config.index.thumbnail_field = 'thumbnail_path_ss'

    # solr path which will be added to solr base url before the other solr params.
    # config.solr_path = 'select'

    # items to show per page, each number in the array represent another option to choose from.
    # config.per_page = [10,20,50,100]

    ## Default parameters to send on single-document requests to Solr. These settings are the Blackligt defaults (see SearchHelper#solr_doc_params) or
    ## parameters included in the Blacklight-jetty document requestHandler.
    #
    # config.default_document_solr_params = {
    #  qt: 'document',
    #  ## These are hard-coded in the blacklight 'document' requestHandler
    #  # fl: '*',
    #  # rows: 1,
    #  # q: '{!term f=id v=$id}'
    # }

    # solr field configuration for search results/index views
    # config.index.title_field = 'title_display'
    # config.index.display_type_field = 'format'
    # config.index.thumbnail_field = 'thumbnail_path_ss'

    # solr fields that will be treated as facets by the blacklight application
    #   The ordering of the field names is the order of the display
    config.add_facet_field ::Solrizer.solr_name('subject', :facetable), limit: 5, label: 'Subjects'
    # config.add_facet_field ::Solrizer.solr_name('resource_type', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('human_readable_resource_type', :facetable), limit: 5, label: 'Resource Type'
    config.add_facet_field ::Solrizer.solr_name('genre', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('named_subject', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('location', :facetable), limit: 5
    config.add_facet_field 'year_isim', limit: 5, range: true
    config.add_facet_field ::Solrizer.solr_name('human_readable_language', :facetable), limit: 5
    config.add_facet_field 'member_of_collections_ssim', limit: 5, label: 'Collection'

    # config.add_facet_field ::Solrizer.solr_name('human_readable_type', :facetable), label: 'Type', limit: 5
    # config.add_facet_field ::Solrizer.solr_name('creator', :facetable), limit: 5
    # config.add_facet_field ::Solrizer.solr_name('contributor', :facetable), label: 'Contributor', limit: 5
    # config.add_facet_field ::Solrizer.solr_name('keyword', :facetable), limit: 5
    # config.add_facet_field ::Solrizer.solr_name('based_near_label', :facetable), limit: 5
    # config.add_facet_field ::Solrizer.solr_name('publisher', :facetable), limit: 5
    # config.add_facet_field ::Solrizer.solr_name('file_format', :facetable), limit: 5
    # config.add_facet_field ::Solrizer.solr_name('member_of_collection_ids', :symbol), limit: 5, label: 'Collections', helper_method: :collection_title_by_id
    # config.add_facet_field ::Solrizer.solr_name('repository', :facetable), limit: 5
    # config.add_facet_field ::Solrizer.solr_name('rights_country', :facetable), limit: 5
    # config.add_facet_field ::Solrizer.solr_name('extent', :facetable), limit: 5

    # The generic_type isn't displayed on the facet list
    # It's used to give a label to the filter that comes from the user profile
    config.add_facet_field ::Solrizer.solr_name('generic_type', :facetable), if: false

    # Have BL send all facet field names to Solr, which has been the default
    # previously. Simply remove these lines if you'd rather use Solr request
    # handler defaults, or have no facets.
    config.add_facet_fields_to_solr_request!

    # solr fields to be displayed in the index (search results / list view
    #   The   config.add_index_field ::Solrizer.solr_name('title', :stored_searchable), label: 'Title', itemprop: 'name', if: false
    config.add_index_field ::Solrizer.solr_name('description', :stored_searchable), itemprop: 'description', helper_method: :render_truncated_description
    config.add_index_field 'sort_year_isi', label: 'Date Created'
    # config.add_index_field ::Solrizer.solr_name('normalized_date', :stored_searchable), itemprop: 'dateCreated'
    config.add_index_field ::Solrizer.solr_name('human_readable_resource_type', :stored_searchable), label: 'Resource Type', link_to_facet: ::Solrizer.solr_name('human_readable_resource_type', :facetable)
    config.add_index_field ::Solrizer.solr_name('photographer', :stored_searchable), label: 'Photographer', link_to_facet: ::Solrizer.solr_name('photographer', :facetable)

    # solr fields to be displayed in the show (single result) view
    # The ordering of the field names is the order of the display
    config.add_show_field ::Solrizer.solr_name('title', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('dlcs_collection_name', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('description', :stored_searchable), separator_options: BREAKS
    config.add_show_field ::Solrizer.solr_name('keyword', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('subject', :stored_searchable), link_to_facet: ::Solrizer.solr_name('subject', :facetable), separator_options: BREAKS
    config.add_show_field ::Solrizer.solr_name('architect', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('creator', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('contributor', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('publisher', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('based_near_label', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('human_readable_language', :stored_searchable), link_to_facet: ::Solrizer.solr_name('human_readable_language', :facetable)
    config.add_show_field ::Solrizer.solr_name('date_uploaded', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('date_modified', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('date_created', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('human_readable_rights_statement', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('human_readable_resource_type', :stored_searchable), label: 'Resource Type', link_to_facet: ::Solrizer.solr_name('human_readable_resource_type', :facetable)
    config.add_show_field ::Solrizer.solr_name('format', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('identifier', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('member_of_collections', :symbol), label: 'Collection', link_to_facet: ::Solrizer.solr_name('member_of_collections', :facetable)
    config.add_show_field ::Solrizer.solr_name('caption', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('alternative_title', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('dimensions', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('extent', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('funding_note', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('genre', :stored_searchable), link_to_facet: ::Solrizer.solr_name('genre', :facetable), separator_options: BREAKS
    config.add_show_field ::Solrizer.solr_name('place_of_origin', :stored_searchable), separator_options: BREAKS
    config.add_show_field ::Solrizer.solr_name('geographic_coordinates', :symbol)
    config.add_show_field ::Solrizer.solr_name('location', :stored_searchable), link_to_facet: ::Solrizer.solr_name('location', :facetable)
    config.add_show_field 'local_identifier_ssm', label: 'Local identifier'
    config.add_show_field ::Solrizer.solr_name('medium', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('named_subject', :stored_searchable), link_to_facet: ::Solrizer.solr_name('named_subject', :facetable), separator_options: BREAKS
    config.add_show_field ::Solrizer.solr_name('repository', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('rights_country', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('rights_holder', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('photographer', :stored_searchable), label: 'Photographer', link_to_facet: ::Solrizer.solr_name('photographer', :facetable)
    config.add_show_field ::Solrizer.solr_name('services_contact', :displayable), label: 'Rights services contact'
    config.add_show_field 'support_tesim', label: 'Support'
    config.add_show_field ::Solrizer.solr_name('uniform_title', :stored_searchable)

    config.add_show_field 'ark_ssi', label: 'ARK'
    config.add_show_field 'oclc_tesim_ssi', label: 'OCLC Number'
    config.add_show_field 'longitude_tesim', label: 'Latitude'
    config.add_show_field 'latitude_tesim', label: 'Longitude'

    # "fielded" search configuration. Used by pulldown among other places.
    # For supported keys in hash, see rdoc for Blacklight::SearchFields
    #
    # Search fields will inherit the :qt solr request handler from
    # config[:default_solr_parameters], OR can specify a different one
    # with a :qt key/value. Below examples inherit, except for subject
    # that specifies the same :qt as default for our own internal
    # testing purposes.
    #
    # The :key is what will be used to identify this BL search field internally,
    # as well as in URLs -- so changing it after deployment may break bookmarked
    # urls.  A display label will be automatically calculated from the :key,
    # or can be specified manually to be different.
    #
    # This one uses all the defaults set by the solr request handler. Which
    # solr request handler? The one set in config[:default_solr_parameters][:qt],
    # since we aren't specifying it otherwise.
    search_field_service = ::SearchFieldService.instance
    config.add_search_field('all_fields', label: 'All Fields') do |field|
      field.solr_parameters = {
        qf: search_field_service.search_fields
      }
    end

    config.add_search_field('title_tesim', label: 'Title') do |field|
      field.solr_parameters = {
        qf: 'title_tesim',
        pf: ''
      }
    end

    config.add_search_field('subject_tesim', label: 'Subject') do |field|
      field.solr_parameters = {
        qf: 'subject_tesim',
        pf: ''
      }
    end

    # "sort results by" select (pulldown)
    # label in pulldown is followed by the name of the SOLR field to sort by and
    # whether the sort is ascending or descending (it must be asc or desc
    # except in the relevancy case).
    # label is key, solr field is value
    config.add_sort_field 'score desc', label: 'Relevance'
    config.add_sort_field 'sort_title_ssort asc', label: 'Title (A-Z)'
    config.add_sort_field 'sort_title_ssort desc', label: 'Title (Z-A)'
    config.add_sort_field 'sort_year_isi desc', label: 'Year (newest)'
    config.add_sort_field 'sort_year_isi asc', label: 'Year (oldest)'

    # If there are more than this many search results, no spelling ("did you
    # mean") suggestion is offered.
    config.spell_max = 5

    # TO-DO: what about autsuggest? Do we want this?
    # Configuration for autocomplete suggestor
    # config.autocomplete_enabled = true
    # config.autocomplete_path = 'suggest'

    # Blacklight update to 7.0.0
    config.add_results_document_tool(:bookmark, partial: 'bookmark_control', if: :render_bookmarks_control?)

    config.add_results_collection_tool(:sort_widget)
    config.add_results_collection_tool(:per_page_widget)
    config.add_results_collection_tool(:view_type_group)

    config.add_show_tools_partial(:citation)

    config.add_nav_action(:bookmark, partial: 'blacklight/nav/bookmark', if: :render_bookmarks_control?)
    config.add_nav_action(:search_history, partial: 'blacklight/nav/search_history')
  end

  # Override this method from the
  # blacklight-access_controls gem to allow the
  # user to view the show page if they have at least
  # 'discovery'-level permission.
  def enforce_show_permissions(_opts = {})
    permissions = current_ability.permissions_doc(params[:id])
    unless can? :discover, permissions
      raise Blacklight::AccessControls::AccessDenied.new('You do not have sufficient access privileges to view this document, which has been marked private.', :discover, params[:id])
    end
    permissions
  end
end
