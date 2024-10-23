# coding: utf-8
# frozen_string_literal: true

require 'solrizer'
require 'ucla/oai/solr_document_provider'

class CatalogController < ApplicationController
  include BlacklightRangeLimit::ControllerOverride
  include Blacklight::Catalog
  include BlacklightOaiProvider::Controller
  include Blacklight::AccessControls::Catalog

  before_action :cannonical_url_redirect, only: :show

  # Apply the blacklight-access_controls
  before_action :enforce_show_permissions, only: :show

  include BlacklightHelper

  # ------------------------------------------------------
  # OAI Configuration
  # http://localhost:3003/catalog/oai

  configure_blacklight do |config|
    config.oai = {
      provider: {
        repository_name: 'UCLA Library Digital Collections',
        repository_url: 'https://' + ENV['RAILS_HOST'] + '/catalog/oai?verb=Identify',
        record_prefix: 'oai:library.ucla.edu',
        admin_email: 'dlp@library.ucla.edu',
        sample_id: 'ark:/21198/zz002j8cxk'
      },
      document: {
        set_model: Ucla::Oai::CollectionSolrSet,
        limit: 25, # number of records returned with each request, default: 15
        set_fields: [ # ability to define ListSets, optional, default: nil
          # { label: 'collections', solr_field: 'member_of_collections_ssim' },
          { solr_field: 'member_of_collection_ids_ssim' },
          { solr_field: 'oai_set_ssim' }
        ]
      }
    }

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
      fq: '(ark_ssi:* AND ((has_model_ssim:Work) OR (has_model_ssim:Collection)) AND !((visibility_ssi:restricted) OR (visibility_ssi:discovery) OR (visibility_ssi:sinai)))'
      ### we want to only return works where visibility_ssi == open (not restricted)
    }

    # config.show.partials.insert(1, :collection_banner)
    config.show.partials.insert(2, :media_viewer)

    # ------------------------------------------------------
    # INDEX PAGE
    # solr field configuration for document/show views
    # solr field configuration for document/show views
    config.index.title_field = 'title_tesim'
    config.index.display_type_field = 'has_model_ssim'
    config.index.thumbnail_field = 'thumbnail_url_ss'
    config.index.document_presenter_class = Ursus::IndexPresenter

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

    # ------------------------------------------------------
    # FACETS
    # solr fields that will be treated as facets by the blacklight application
    # The ordering of the field names is the order of the display

    config.add_facet_field 'combined_subject_ssim', limit: 5, label: 'Subject'
    # config.add_facet_field ::Solrizer.solr_name('resource_type', :facetable), limit: 5 same as : config.add_facet_field 'resource_type_sim', limit: 5
    config.add_facet_field 'human_readable_resource_type_sim', limit: 5, label: 'Resource Type'
    config.add_facet_field 'genre_sim', limit: 5
    config.add_facet_field 'named_subject_sim', limit: 5
    config.add_facet_field 'location_sim', limit: 5
    config.add_facet_field 'year_isim', limit: 5, range: true
    config.add_facet_field 'human_readable_language_sim', limit: 5
    config.add_facet_field 'member_of_collections_ssim', limit: 5, label: 'Collection'
    config.add_facet_field 'repository_sim', limit: 5
    config.add_facet_field 'program_sim', label: 'Program', limit: 5

    # The generic_type isn't displayed on the facet list
    # It's used to give a label to the filter that comes from the user profile
    config.add_facet_field 'generic_type_sim', if: false

    # Have BL send all facet field names to Solr,
    # which has been the default previously.
    # Remove these lines if
    # -- you'd rather use Solr request handler defaults,
    # -- or have no facets.
    config.add_facet_fields_to_solr_request!

    # ------------------------------------------------------
    # INDEX PAGE / SEARCH RESULTS
    # solr fields to be displayed in the index search results / list view
    # The config.add_index_field ::Solrizer.solr_name('title',  :stored_searchable), label: 'Title', itemprop: 'name', if: false

    config.add_index_field 'description_tesim', itemprop: 'description', helper_method: :render_truncated_description
    config.add_index_field 'date_created_tesim', label: 'Date Created'
    # config.add_index_field ::Solrizer.solr_name('normalized_date', :stored_searchable), itemprop: 'dateCreated'
    config.add_index_field 'human_readable_resource_type_tesim', label: 'Resource Type', link_to_facet: 'human_readable_resource_type_sim'
    config.add_index_field 'photographer_tesim', label: 'Photographer', link_to_facet: 'photographer_sim'
    config.add_index_field 'member_of_collections_ssim', label: 'Collection', link_to_facet: 'member_of_collections_ssim'

    # ------------------------------------------------------
    # SHOW PAGE / ITEM PAGE / Individual Work (Universal Viewer Page)
    # Primary / Item Overview / Notes / Physical description
    # Secondary / Find This Item / Access Conditions /
    # solr fields to be displayed in the show (single result) view
    # The ordering of the field names is the order of the display
    # ::Solrizer.solr_name('funding_note', :stored_searchable) == 'funding_note_tesim'
    # To create a link on the item/show page of Ursus that links to a search for all fields of this name add below:
    # link_to_facet: 'fieldname_sim' (refer to editor on line 162)
    # and in Californica add :facetable to its predicate in app/models/ucla_metadata.rb
    # https://docs.google.com/spreadsheets/d/1Ult1ZpMuyKd92lZ5ODmBA6c7hO1pZGjXHTzN0_BOjeA/edit#gid=0
    #
    # Line breaks (separator_options: BREAKS) are set globally in two files:
    #   config/initializers/blacklight.rb
    #   app/processors/custom_join.rb
    #
    # More details: https://github.com/projectblacklight/blacklight/wiki/value-rendering

    config.add_show_field 'architect_tesim', label: 'Architect', link_to_facet: 'architect_sim' # Primary / Item Overview
    config.add_show_field 'alternative_title_tesim', label: 'Alternative title' # Primary / Item Overview
    config.add_show_field 'archival_collection_tesi', label: 'Archival Collection' # Secondary / Find This Item
    config.add_show_field 'ark_ssi', label: 'ARK' # Secondary / Find This Item
    config.add_show_field 'artist_tesim', label: 'Artist', link_to_facet: 'artist_sim' # Primary / Item Overview
    config.add_show_field 'author_tesim', label: 'Author', link_to_facet: 'author_sim' # Primary / Item Overview
    config.add_show_field 'based_near_label_tesim', label: 'Location (based near)' # Not Using
    config.add_show_field 'binding_note_ssi', label: 'Binding note' # Primary / Physical description
    config.add_show_field 'calligrapher_tesim', label: 'Calligrapher', link_to_facet: 'calligrapher_sim' # Primary / Item Overview
    config.add_show_field 'caption_tesim', label: 'Caption' # Primary / Notes
    config.add_show_field 'cartographer_tesim', label: 'Cartographer', link_to_facet: 'cartographer_sim' # Primary / Item Overview
    config.add_show_field 'citation_source_tesim', label: 'References' # Primary / Notes
    config.add_show_field 'collation_tesim', label: 'Collation' # Primary / Physical description
    config.add_show_field 'colophon_tesim', label: 'Colophon' # Primary / Notes
    config.add_show_field 'commentator_tesim', label: 'Commentator', link_to_facet: 'commentator_sim' # Primary / Item Overview
    config.add_show_field 'composer_tesim', label: 'Composer', link_to_facet: 'composer_sim' # Primary / Item Overview
    config.add_show_field 'condition_note_ssi', label: 'Condition note' # Primary / Physical description
    config.add_show_field 'content_disclaimer_ssm', label: 'Content disclaimer'
    config.add_show_field 'contents_note_tesim', label: 'Contents note', auto_link: true # make this field url aware # Primary / Notes
    config.add_show_field 'contributor_tesim', label: 'Contributor' # Not Using
    config.add_show_field 'creator_tesim', label: 'Creator', link_to_facet: 'creator_sim' # Primary / Item Overview
    config.add_show_field 'date_created_tesim', label: 'Date created' # Primary / Item Overview
    config.add_show_field 'description_tesim', label: 'Description' # Primary / Notes
    config.add_show_field 'dimensions_tesim', label: 'Dimensions' # Primary / Physical description
    config.add_show_field 'director_tesim', label: 'Director', link_to_facet: 'director_sim' # Primary / Item Overview
    config.add_show_field 'dlcs_collection_name_tesim' # Not Using
    config.add_show_field 'edition_ssm', label: 'Edition' # Primary / Item Overview
    config.add_show_field 'editor_tesim', label: 'Editor', link_to_facet: 'editor_sim'
    config.add_show_field 'electronic_locator_ss', label: 'External item record' # Secondary / Button
    # Primary / Item Overview
    config.add_show_field 'engraver_tesim', label: 'Engraver', link_to_facet: 'engraver_sim' # Primary / Item Overview
    config.add_show_field 'extent_tesim', label: 'Extent' # Primary / Physical description
    config.add_show_field 'features_tesim', label: 'Features', link_to_facet: 'features_sim' # Primary / Physical description
    config.add_show_field 'finding_aid_url_ssm', label: 'Finding aid url' # Secondary / Find This Item
    config.add_show_field 'foliation_tesim', label: 'Foliation' # Primary / Physical description
    config.add_show_field 'form_ssi', label: 'Form', link_to_facet: 'form_sim' # Primary / Physical description
    config.add_show_field 'format_tesim', label: 'Format' # Primary / Physical description
    config.add_show_field 'format_book_tesim', label: 'Format' # Primary / Physical description
    config.add_show_field 'funding_note_tesim', label: 'Funding note' # Secondary / Access Conditions
    config.add_show_field 'genre_tesim', label: 'Genre', link_to_facet: 'genre_sim' # Primary / Physical description
    config.add_show_field 'geographic_coordinates_ssim' # Primary / Physical description
    config.add_show_field 'hand_note_tesim', limit: 7, label: 'Hand note' # 'Writing and hands'# Primary / Physical description
    config.add_show_field 'history_tesim', label: 'History' # Primary / Notes
    config.add_show_field 'host_tesim', label: 'Host', link_to_facet: 'host_sim' # Primary / Physical description
    config.add_show_field 'human_readable_language_tesim', label: 'Language', link_to_facet: 'human_readable_language_sim' # Primary / Item Overview
    config.add_show_field 'human_readable_resource_type_tesim', label: 'Resource type', link_to_facet: 'human_readable_resource_type_sim' # Primary / Physical description
    config.add_show_field 'human_readable_related_record_title_ssm', label: 'Related Records' # Primary / Notes
    config.add_show_field 'human_readable_rights_statement_tesim', label: 'Rights statement' # Secondary / Access Conditions
    config.add_show_field 'identifier_tesim', label: 'Identifier' # Not Using
    config.add_show_field 'identifier_global_ssim', label: 'Identifier' # Secondary / Find This Item
    config.add_show_field 'iiif_manifest_url_ssi', label: 'Manifest url' # Secondary / Find This Item
    config.add_show_field 'illuminator_tesim', label: 'Illuminator', link_to_facet: 'illuminator_sim' # Primary / Item Overview
    config.add_show_field 'illustrations_note_tesim', label: 'Illustrations note' # Primary / Physical description
    config.add_show_field 'illustrator_tesim', label: 'Illustrator', link_to_facet: 'illustrator_sim' # Primary / Item Overview
    config.add_show_field 'interviewee_tesim', label: 'Interviewee', link_to_facet: 'interviewee_sim' # Primary / Item Overview
    config.add_show_field 'interviewer_tesim', label: 'Interviewer', link_to_facet: 'interviewee_sim' # Primary / Item Overview
    config.add_show_field 'keyword_tesim', label: 'Keyword' # Not Using
    config.add_show_field 'latitude_tesim', label: 'Latitude' # Primary / Physical description
    config.add_show_field 'license_tesim', label: 'License', helper_method: :render_license # Secondary / Access Conditions
    config.add_show_field 'local_identifier_ssim', label: 'Local identifier' # Secondary / Find This Item
    config.add_show_field 'local_rights_statement_ssm', label: 'Local rights statement' # Secondary / Access Conditions
    config.add_show_field 'location_tesim', label: 'Location', link_to_facet: 'location_sim' # Primary / Physical description
    config.add_show_field 'longitude_tesim', label: 'Longitude' # Primary / Physical description
    config.add_show_field 'lyricist_tesim', label: 'Lyricist', link_to_facet: 'lyricist_sim' # Primary / Item Overview
    config.add_show_field 'medium_tesim', label: 'Medium' # Primary / Physical description
    config.add_show_field 'member_of_collections_ssim', label: 'Collection', link_to_facet: 'member_of_collections_ssim' # Primary / Item Overview
    config.add_show_field 'musician_tesim', label: 'Musician', link_to_facet: 'musician_sim' # Primary / Physical description
    config.add_show_field 'named_subject_tesim', label: 'Named subject', link_to_facet: 'named_subject_sim' # Primary / Physical description
    config.add_show_field 'note_tesim', label: 'Note' # Primary / Notes
    config.add_show_field 'oai_set_ssim'
    config.add_show_field 'oclc_ssi', label: 'OCLC Number' # Secondary / Find This Item
    config.add_show_field 'opac_url_ssi', label: 'Opac url' # Secondary / Find This Item
    config.add_show_field 'other_versions_tesim', label: 'Other version(s)' # Secondary / Find This Item
    config.add_show_field 'page_layout_ssim', label: 'Page layout' # Primary / Physical description
    config.add_show_field 'photographer_tesim', label: 'Photographer', link_to_facet: 'photographer_sim' # Primary / Item Overview
    config.add_show_field 'place_of_origin_tesim', label: 'Place of origin' # Primary / Physical description
    config.add_show_field 'printer_tesim', label: 'Printer', link_to_facet: 'printer_sim' # Primary / Physical description
    config.add_show_field 'printmaker_tesim', label: 'Printmaker', link_to_facet: 'printmaker_sim' # Primary / Item Overview
    config.add_show_field 'producer_tesim', label: 'Producer', link_to_facet: 'producer_sim' # Primary / Item Overview
    config.add_show_field 'program_tesim', label: 'Program', link_to_facet: 'program_sim' # Primary / Item Overview
    config.add_show_field 'provenance_tesim', label: 'Provenance' # Primary / Notes
    config.add_show_field 'publisher_tesim', label: 'Publisher' # Primary / Item Overview
    config.add_show_field 'recipient_tesim', label: 'Recipient', link_to_facet: 'recipient_sim' # Primary / Item Overview
    config.add_show_field 'related_to_ssm', label: 'Related Items', auto_link: true # make this field url aware # Primary / Notes
    config.add_show_field 'repository_tesim', label: 'Repository', link_to_facet: 'repository_sim' # Secondary / Find This Item
    config.add_show_field 'researcher_tesim', label: 'Researcher', link_to_facet: 'researcher_sim' # Primary / Physical description
    config.add_show_field 'resp_statement_tesim', label: 'Statement of Responsibility' # Primary / Notes
    config.add_show_field 'rights_country_tesim', label: 'Rights (country of creation' # Secondary / Access Conditions
    config.add_show_field 'rights_holder_tesim', label: 'Rights holder' # Secondary / Access Conditions
    config.add_show_field 'rubricator_tesim', label: 'Rubricator', link_to_facet: 'rubricator_sim' # Primary / Item Overview
    config.add_show_field 'scribe_tesim', label: 'Scribe', link_to_facet: 'scribe_sim' # Primary / Item Overview
    config.add_show_field 'series_tesim', label: 'Series', link_to_facet: 'series_sim' # Primary / Item Overview
    config.add_show_field 'services_contact_ssm', label: 'Rights contact' # Secondary / Access Conditions
    config.add_show_field 'subject_cultural_object_tesim' # Primary / Physical description
    config.add_show_field 'subject_domain_topic_tesim' # Primary / Physical description
    config.add_show_field 'subject_geographic_tesim', label: 'Subject Geographic', link_to_facet: 'subject_geographic_sim' # Primary / Physical description
    config.add_show_field 'subject_temporal_tesim', label: 'Subject Temporal', link_to_facet: 'subject_temporal_sim' # Primary / Physical description
    config.add_show_field 'subject_tesim', label: 'Subject', link_to_facet: 'subject_sim' # Primary / Physical description
    config.add_show_field 'subject_topic_tesim', label: 'Subject Topic', link_to_facet: 'subject_topic_sim' # Primary / Physical description
    config.add_show_field 'summary_tesim', label: 'Summary', auto_link: true # make this field url aware # Primary / Notes
    config.add_show_field 'support_tesim', label: 'Support', link_to_facet: 'support_sim' # Primary / Physical description
    config.add_show_field 'title_tesim', label: 'Title' # Primary / Item Overview
    config.add_show_field 'toc_tesim', label: 'Table of Contents' # Primary / Notes
    config.add_show_field 'translator_tesim', label: 'Translator', link_to_facet: 'translator_sim' # Primary / Item Overview
    config.add_show_field 'uniform_title_tesim', label: 'Uniform title', link_to_facet: 'uniform_title_sim' # Primary / Item Overview

    # ----------------------------------------------
    # DROPDOWN IN SEARCHBAR
    # "fielded" search configuration. Used by pulldown among other places.
    # For supported keys in hash, see rdoc for Blacklight::SearchFields
    #
    # Search fields will inherit the :qt solr request handler
    # from config[:default_solr_parameters],
    # OR can specify a different one with a :qt key/value.
    # Below examples inherit,
    # except for subject which specifies the same :qt as default
    # for our own internal testing purposes.
    #
    # The :key is what will be used
    # to identify this BL search field internally, as well as in URLs
    # -- so changing it after deployment may break bookmarked urls.
    # A display label will be automatically calculated from the :key,
    # or can be specified manually to be different.
    #
    # This one uses all the defaults set by the solr request handler.
    # Which solr request handler?
    # The one set in config[:default_solr_parameters][:qt],
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

    config.add_search_field('subject_tesim subject_topic_tesim subject_geographic_tesim subject_temporal_tesim', label: 'Subject') do |field|
      field.solr_parameters = {
        qf: 'subject_tesim subject_topic_tesim subject_geographic_tesim subject_temporal_tesim',
        pf: ''
      }
    end

    # ------------------------------------------------------
    # CATALOG RESULTS 'SORT RESULTS BY' DROPDOWN
    # the _sort_widget.html.erb partial called in the _browse_results.html.erb partial
    # label in dropdown is followed by
    # the name of the SOLR field to sort by
    # and whether the sort is ascending or descending
    # (it must be asc or desc except in the relevancy case)
    # label is key, solr field is value
    config.add_sort_field 'score desc', label: 'Relevance'
    # config.add_sort_field 'sort_title_ssort asc', label: 'Title (A-Z)'
    # config.add_sort_field 'sort_title_ssort desc', label: 'Title (Z-A)'
    config.add_sort_field 'title_alpha_numeric_ssort asc', label: 'Title (A-Z)'
    config.add_sort_field 'title_alpha_numeric_ssort desc', label: 'Title (Z-A)'
    config.add_sort_field 'date_desc_dtsi desc', label: 'Date (newest)'
    config.add_sort_field 'date_dtsort asc', label: 'Date (oldest)'

    #------------------------------------------------------
    # AUTO_SUGGEST / AUTO_COMPLETE
    # If there are more than this many search results,
    # no spelling ("did you mean") suggestion is offered.
    config.spell_max = 5

    # TO-DO: what about autosuggest? Do we want this?
    # Configuration for autocomplete suggestor
    # config.autocomplete_enabled = true
    # config.autocomplete_path = 'suggest'

    # ------------------------------------------------------
    # BOOKMARK / CITATION
    # Blacklight update to 7.0.0
    config.add_results_document_tool(:bookmark, partial: 'bookmark_control', if: :render_bookmarks_control?)

    # ------------------------------------------------------
    config.add_results_collection_tool(:sort_widget)
    config.add_results_collection_tool(:per_page_widget)
    config.add_results_collection_tool(:view_type_group)

    config.add_show_tools_partial(:citation)

    config.add_nav_action(:bookmark, partial: 'blacklight/nav/bookmark', if: :render_bookmarks_control?)
    config.add_nav_action(:search_history, partial: 'blacklight/nav/search_history')
  end

  # ------------------------------------------------------
  # PERMISSIONS
  # Override this method from the
  # blacklight-access_controls gem to allow the
  # user to view the show page if they have at least
  # 'discovery'-level permission.

  def enforce_show_permissions(_opts = {})
    permissions = current_ability.permissions_doc(solr_id)
    if (permissions['read_access_group_ssim'].present? && permissions['read_access_group_ssim'].include?('registered')) || can?(:discover, permissions)
      permissions
    else
      raise Blacklight::AccessControls::AccessDenied.new('You do not have sufficient access privileges to view this document, which has been marked private.', :discover, params[:id])
    end
  end

  # ------------------------------------------------------
  # COLLECTION COUNT
  # override this method from Blacklight::Catalog.rb to find the collection count
  # https://github.com/projectblacklight/blacklight/blob/master/app/controllers/concerns/blacklight/catalog.rb -- line: 46
  # https://www.rubydoc.info/github/projectblacklight/blacklight/Blacklight/Catalog
  # rubocop:disable Metrics/CyclomaticComplexity

  def show
    if cookies[:message_shown].nil? && request.env['HTTP_USER_AGENT'] =~ /Firefox/
      flash.now[:notice] = "To view the high-quality images for this item in  Firefox, you'll need to change some browser settings"
    end

    deprecated_response, @document = search_service.fetch(solr_id)
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

  def cannonical_url_redirect
    return if request.path.match?(/^\/tomreed\/?$/)

    if params[:id].match?(/ark(\:|(%3A))(\/|(%2F)).*(\/|(%2F)).*/)
      return if request.path == CGI.unescape(request.path) # Good URL!
      target = solr_document_path(params[:id]) # redirect to an unescaped URL
    else
      doc = SolrDocument.find(params[:id]) # will raise Blacklight::Exceptions::RecordNotFound (returns 404) if nothing exists, or if it returns a record w/o an ARK (e.g. hyrax permissions object)
      target = solr_document_path(doc) # request used an old-style hyrax ID (w/ reversed ARK); redirect to the forward-ark ID
    end
    redirect_to target + (request.query_string.to_s.empty? ? '' : "?#{request.query_string}")
  end

  def oai_provider
    @oai_provider ||= Ucla::Oai::SolrDocumentProvider.new(self, oai_config)
  end

  def solr_id
    params[:id].sub(/^ark\:\/+/, '').sub('/', '-').reverse
  end
end
