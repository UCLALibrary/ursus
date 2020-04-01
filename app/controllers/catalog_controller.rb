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
      fq: '(((has_model_ssim:Work) OR (has_model_ssim:Collection)) AND !((visibility_ssi:restricted) OR (visibility_ssi:discovery) OR (visibility_ssi:sinai)))'
      ### we want to only return works where visibility_ssi == open (not restricted)
    }
    config.default_solr_params[:fq] = '((has_model_ssim:Work) AND !(visibility_ssi:restricted))' if Flipflop.sinai?

    # config.show.partials.insert(1, :collection_banner)
    config.show.partials.insert(2, :media_viewer)

    # solr field configuration for document/show views
    config.index.title_field = 'title_tesim'
    config.index.display_type_field = 'has_model_ssim'
    config.index.thumbnail_field = 'thumbnail_url_ss'

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
    # Dynamic Field Conventions https://github.com/samvera/hydra-head/wiki/Solr-Schema
    # config.index.title_field = 'title_display'
    # config.index.display_type_field = 'format'
    # config.index.thumbnail_field = 'thumbnail_path_ss'

    # solr fields that will be treated as facets by the blacklight application
    #   The ordering of the field names is the order of the display
    if Flipflop.sinai?
      config.add_facet_field 'genre_sim', limit: 7
      config.add_facet_field 'place_of_origin_sim', limit: 7, label: 'Place of origin'
      config.add_facet_field 'year_isim', limit: 7, range: true
      config.add_facet_field 'human_readable_language_sim', limit: 7
      config.add_facet_field 'writing_system_sim', limit: 7, label: 'Writing system'
      config.add_facet_field 'script_sim', limit: 7, label: 'Script'
      config.add_facet_field 'features_sim', limit: 7, label: 'Features'
      config.add_facet_field 'support_sim', limit: 7, label: 'Support'
    else
      config.add_facet_field 'subject_sim', limit: 5, label: 'Subjects'
      # config.add_facet_field ::Solrizer.solr_name('resource_type', :facetable), limit: 5
      config.add_facet_field 'human_readable_resource_type_sim', limit: 5, label: 'Resource Type'
      config.add_facet_field 'genre_sim', limit: 5
      config.add_facet_field 'named_subject_sim', limit: 5
      config.add_facet_field 'location_sim', limit: 5
      config.add_facet_field 'year_isim', limit: 5, range: true
      config.add_facet_field 'human_readable_language_sim', limit: 5
      config.add_facet_field 'member_of_collections_ssim', limit: 5, label: 'Collection'
    end

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
    config.add_facet_field 'generic_type_sim', if: false

    # Have BL send all facet field names to Solr, which has been the default
    # previously. Simply remove these lines if you'd rather use Solr request
    # handler defaults, or have no facets.
    config.add_facet_fields_to_solr_request!

    # solr fields to be displayed in the index search results / list view
    #   The   config.add_index_field ::Solrizer.solr_name('title', :stored_searchable), label: 'Title', itemprop: 'name', if: false

    config.add_index_field 'description_tesim', itemprop: 'description', helper_method: :render_truncated_description
    config.add_index_field 'sort_year_isi', label: 'Date Created'
    # config.add_index_field ::Solrizer.solr_name('normalized_date', :stored_searchable), itemprop: 'dateCreated'
    config.add_index_field 'human_readable_resource_type_tesim', label: 'Resource Type', link_to_facet: 'human_readable_resource_type_sim'
    config.add_index_field 'photographer_tesim', label: 'Photographer', link_to_facet: 'photographer_sim'
    config.add_index_field 'member_of_collections_ssim', label: 'Collection', link_to_facet: 'member_of_collections_ssim' unless Flipflop.sinai?

    # solr fields to be displayed in the show (single result) view
    # The ordering of the field names is the order of the display
    # ::Solrizer.solr_name('funding_note', :stored_searchable) == 'funding_note_tesim'
    config.add_show_field 'architect_tesim'
    config.add_show_field 'alternative_title_tesim', separator_options: BREAKS
    config.add_show_field 'ark_ssi', label: 'ARK'
    config.add_show_field 'author_tesim', label: 'Author'
    config.add_show_field 'based_near_label_tesim'
    config.add_show_field 'binding_note_tesim', label: 'Binding note'
    config.add_show_field 'caption_tesim'
    config.add_show_field 'collation_tesim'
    config.add_show_field 'colophon_tesim', label: 'Colophon'
    config.add_show_field 'composer_tesim', label: 'Composer'
    config.add_show_field 'condition_note_tesim', label: 'Condition note'
    config.add_show_field 'contents_note_tesim', label: 'Contents note'
    config.add_show_field 'contributor_tesim'
    config.add_show_field 'creator_tesim', label: 'Creator'
    config.add_show_field 'date_created_tesim', separator_options: BREAKS
    config.add_show_field 'date_modified_tesim'
    config.add_show_field 'date_uploaded_tesim'
    config.add_show_field 'description_tesim', separator_options: BREAKS
    config.add_show_field 'dimensions_tesim'
    config.add_show_field 'dlcs_collection_name_tesim' unless Flipflop.sinai?
    config.add_show_field 'explicit_tesim', label: 'Explicit'
    config.add_show_field 'extent_tesim', separator_options: BREAKS
    config.add_show_field 'features_tesim', link_to_facet: 'features_sim', label: 'Features'
    config.add_show_field 'finding_aid_url_ssm', label: 'Finding aid url'
    config.add_show_field 'foliation_tesim', label: 'Foliation'
    config.add_show_field 'format_tesim'
    config.add_show_field 'funding_note_tesim'
    config.add_show_field 'genre_tesim', link_to_facet: 'genre_sim', separator_options: BREAKS
    config.add_show_field 'geographic_coordinates_ssim'
    config.add_show_field 'human_readable_resource_type_tesim', label: 'Resource Type', link_to_facet: 'human_readable_resource_type_sim'
    config.add_show_field 'human_readable_rights_statement_tesim'
    config.add_show_field 'human_readable_language_tesim', link_to_facet: 'human_readable_language_sim'
    config.add_show_field 'identifier_tesim'
    config.add_show_field 'illuminator_tesim', label: 'Illuminator'
    config.add_show_field 'illustrations_note_tesim', label: 'Illustrations note'
    config.add_show_field 'incipit_tesim', label: 'Incipit'
    config.add_show_field 'inscription_tesim', label: 'Inscription'
    config.add_show_field 'keyword_tesim'
    config.add_show_field 'latitude_tesim', label: 'Latitude'
    config.add_show_field 'local_rights_statement_ssim', label: 'Local Rights statement'
    config.add_show_field 'location_tesim', link_to_facet: 'location_sim'
    config.add_show_field 'local_identifier_ssm', label: 'Local identifier', separator_options: BREAKS
    config.add_show_field 'longitude_tesim', label: 'Longitude'
    config.add_show_field 'lyricist_tesim', label: 'Lyricist'
    config.add_show_field 'medium_tesim'
    config.add_show_field 'member_of_collections_ssim', label: 'Collection', link_to_facet: 'member_of_collections_ssim' unless Flipflop.sinai?
    config.add_show_field 'named_subject_tesim', link_to_facet: 'named_subject_sim', separator_options: BREAKS
    config.add_show_field 'opac_url_ssi', label: 'Opac url'
    config.add_show_field 'oclc_ssi', label: 'OCLC Number'
    config.add_show_field 'page_layout_ssim', label: 'Page layout'
    config.add_show_field 'photographer_tesim', label: 'Photographer', link_to_facet: 'photographer_sim', separator_options: BREAKS
    config.add_show_field 'place_of_origin_tesim', separator_options: BREAKS
    config.add_show_field 'provenance_tesim', label: 'Provenance'
    config.add_show_field 'publisher_tesim'
    config.add_show_field 'repository_tesim'
    config.add_show_field 'rights_country_tesim'
    config.add_show_field 'rights_holder_tesim'
    config.add_show_field 'rubricator_tesim', label: 'Rubricator'
    config.add_show_field 'scribe_tesim', label: 'Scribe'
    config.add_show_field 'script_tesim', label: 'Script'
    config.add_show_field 'services_contact_ssm', label: 'Rights services contact'
    config.add_show_field 'subject_tesim', link_to_facet: 'subject_sim', separator_options: BREAKS
    config.add_show_field 'subject_topic_tesim', label: 'Subject topic'
    config.add_show_field 'summary_tesim', label: 'Summary'
    config.add_show_field 'support_tesim', label: 'Support'
    config.add_show_field 'title_tesim'
    config.add_show_field 'toc_tesim', label: 'Table of Contents'
    config.add_show_field 'uniform_title_tesim'
    config.add_show_field 'writing_and_hands_tesim', label: 'Writing and hands'
    config.add_show_field 'writing_system_tesim', label: 'Writing system'

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
    config.add_sort_field 'title_alpha_numeric_ssort asc', label: 'Title (A-Z)'
    config.add_sort_field 'title_alpha_numeric_ssort desc', label: 'Title (Z-A)'
    # config.add_sort_field 'sort_title_ssort asc', label: 'Title (A-Z)'
    # config.add_sort_field 'sort_title_ssort desc', label: 'Title (Z-A)'
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

  # override this method from Blacklight::Catalog.rb to find the collection count
  def show
    deprecated_response, @document = search_service.fetch(params[:id])
    @response = ActiveSupport::Deprecation::DeprecatedObjectProxy.new(deprecated_response, 'The @response instance variable is deprecated; use @document.response instead.')
    respond_to do |format|
      format.html { @search_context = setup_next_and_previous_documents }
      format.json
      additional_export_formats(@document, format)
    end
    if @document[:has_model_ssim][0] == 'Collection'
      facet_member_of_collections = blacklight_config.facet_fields['member_of_collections_ssim']
      if facet_member_of_collections
        @response_collection = search_service.facet_field_response(facet_member_of_collections.key, "f.member_of_collections_ssim.facet.contains" => @document[:title_tesim][0])
        @display_facet = @response_collection.aggregations[facet_member_of_collections.field]
        if @display_facet&.items && @display_facet.items.first
          @collection_count = @display_facet.items.first.hits
        end
      end
    end
  end
end
