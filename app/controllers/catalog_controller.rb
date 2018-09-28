# frozen_string_literal: true
require 'solrizer'

class CatalogController < ApplicationController

  include Blacklight::Catalog

  configure_blacklight do |config|
    ## Class for sending and receiving requests from a search index
    # config.repository_class = Blacklight::Solr::Repository
    #
    ## Class for converting Blacklight's url parameters to into request parameters for the search index
    # config.search_builder_class = ::SearchBuilder
    #
    ## Model that maps search index responses to the blacklight response model
    # config.response_model = Blacklight::Solr::Response

    ## Default parameters to send to solr for all search-like requests. See also SearchBuilder#processed_parameters
    config.default_solr_params = {
      qt: 'search',
      rows: 10,
      qf: 'title_tesim description_tesim creator_tesim keyword_tesim',
      fq: '{!term f=has_model_ssim v=Work}'
    }

    # solr field configuration for document/show views
    config.index.title_field = ::Solrizer.solr_name('title', :stored_searchable)
    config.index.display_type_field = ::Solrizer.solr_name('has_model', :symbol)
    config.index.thumbnail_field = 'thumbnail_path_ss'

    # solr path which will be added to solr base url before the other solr params.
    #config.solr_path = 'select'

    # items to show per page, each number in the array represent another option to choose from.
    #config.per_page = [10,20,50,100]

    ## Default parameters to send on single-document requests to Solr. These settings are the Blackligt defaults (see SearchHelper#solr_doc_params) or
    ## parameters included in the Blacklight-jetty document requestHandler.
    #
    #config.default_document_solr_params = {
    #  qt: 'document',
    #  ## These are hard-coded in the blacklight 'document' requestHandler
    #  # fl: '*',
    #  # rows: 1,
    #  # q: '{!term f=id v=$id}'
    #}

    # solr field configuration for search results/index views
    #config.index.title_field = 'title_display'
    #config.index.display_type_field = 'format'
    #config.index.thumbnail_field = 'thumbnail_path_ss'

    # solr fields that will be treated as facets by the blacklight application
    #   The ordering of the field names is the order of the display
    config.add_facet_field ::Solrizer.solr_name('human_readable_type', :facetable), label: 'Type', limit: 5
    config.add_facet_field ::Solrizer.solr_name('resource_type', :facetable), label: 'Resource Type', limit: 5
    config.add_facet_field ::Solrizer.solr_name('creator', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('contributor', :facetable), label: 'Contributor', limit: 5
    config.add_facet_field ::Solrizer.solr_name('keyword', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('subject', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('language', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('based_near_label', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('publisher', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('file_format', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('member_of_collection_ids', :symbol), limit: 5, label: 'Collections', helper_method: :collection_title_by_id
    config.add_facet_field ::Solrizer.solr_name('repository', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('normalized_date', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('named_subject', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('rights_country', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('medium', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('dimensions', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('extent', :facetable), limit: 5
    config.add_facet_field ::Solrizer.solr_name('location', :stored_searchable), label: 'Location', limit: 5

    # The generic_type isn't displayed on the facet list
    # It's used to give a label to the filter that comes from the user profile
    config.add_facet_field ::Solrizer.solr_name('generic_type', :facetable), if: false

    # Have BL send all facet field names to Solr, which has been the default
    # previously. Simply remove these lines if you'd rather use Solr request
    # handler defaults, or have no facets.
    config.add_facet_fields_to_solr_request!

    # solr fields to be displayed in the index (search results) view
    #   The   config.add_index_field ::Solrizer.solr_name('title', :stored_searchable), label: 'Title', itemprop: 'name', if: false

    config.add_index_field ::Solrizer.solr_name('description', :stored_searchable), itemprop: 'description'
    config.add_index_field ::Solrizer.solr_name('keyword', :stored_searchable), itemprop: 'keywords', link_to_search: ::Solrizer.solr_name('keyword', :facetable)
    config.add_index_field ::Solrizer.solr_name('subject', :stored_searchable), itemprop: 'about', link_to_search: ::Solrizer.solr_name('subject', :facetable)
    config.add_index_field ::Solrizer.solr_name('creator', :stored_searchable), itemprop: 'creator', link_to_search: ::Solrizer.solr_name('creator', :facetable)
    config.add_index_field ::Solrizer.solr_name('contributor', :stored_searchable), itemprop: 'contributor', link_to_search: ::Solrizer.solr_name('contributor', :facetable)
    config.add_index_field ::Solrizer.solr_name('publisher', :stored_searchable), itemprop: 'publisher', link_to_search: ::Solrizer.solr_name('publisher', :facetable)
    config.add_index_field ::Solrizer.solr_name('based_near_label', :stored_searchable), itemprop: 'contentLocation', link_to_search: ::Solrizer.solr_name('based_near_label', :facetable)
    config.add_index_field ::Solrizer.solr_name('language', :stored_searchable), itemprop: 'inLanguage', link_to_search: ::Solrizer.solr_name('language', :facetable)
    config.add_index_field ::Solrizer.solr_name('date_uploaded', :stored_sortable, type: :date), itemprop: 'datePublished'
    config.add_index_field ::Solrizer.solr_name('date_modified', :stored_sortable, type: :date), itemprop: 'dateModified'
    config.add_index_field ::Solrizer.solr_name('date_created', :stored_searchable), itemprop: 'dateCreated'
    config.add_index_field ::Solrizer.solr_name('rights_statement', :stored_searchable)
    config.add_index_field ::Solrizer.solr_name('license', :stored_searchable)
    config.add_index_field ::Solrizer.solr_name('resource_type', :stored_searchable), label: 'Resource Type', link_to_search: ::Solrizer.solr_name('resource_type', :facetable)
    config.add_index_field ::Solrizer.solr_name('file_format', :stored_searchable), link_to_search: ::Solrizer.solr_name('file_format', :facetable)
    config.add_index_field ::Solrizer.solr_name('identifier', :stored_searchable)

    # solr fields to be displayed in the show (single result) view
    #   The ordering of the field names is the order of the display
    config.add_show_field ::Solrizer.solr_name('title', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('description', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('keyword', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('subject', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('creator', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('contributor', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('publisher', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('based_near_label', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('language', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('date_uploaded', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('date_modified', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('date_created', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('rights_statement', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('license', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('resource_type', :stored_searchable), label: 'Resource Type'
    config.add_show_field ::Solrizer.solr_name('format', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('identifier', :stored_searchable)

    config.add_show_field ::Solrizer.solr_name('caption', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('dimensions', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('extent', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('funding_note', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('genre', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('latitude', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('location', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('local_identifier', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('longitude', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('medium', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('named_subject', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('normalized_date', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('repository', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('rights_country', :stored_searchable)
    config.add_show_field ::Solrizer.solr_name('rights_holder', :stored_searchable)

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
    config.add_search_field('all_fields', label: 'All Fields') do |field|
      all_names = config.show_fields.values.map(&:field).join(' ')
      title_name = ::Solrizer.solr_name('title', :stored_searchable)
      field.solr_parameters = {
        qf: "#{all_names} file_format_tesim all_text_timv",
        pf: title_name.to_s
      }
    end

    # "sort results by" select (pulldown)
    # label in pulldown is followed by the name of the SOLR field to sort by and
    # whether the sort is ascending or descending (it must be asc or desc
    # except in the relevancy case).
    # label is key, solr field is value
    # config.add_sort_field "score desc, #{uploaded_field} desc", label: 'relevance'
    # config.add_sort_field "#{uploaded_field} desc", label: "date uploaded \u25BC"
    # config.add_sort_field "#{uploaded_field} asc", label: "date uploaded \u25B2"
    # config.add_sort_field "#{modified_field} desc", label: "date modified \u25BC"
    # config.add_sort_field "#{modified_field} asc", label: "date modified \u25B2"

    # If there are more than this many search results, no spelling ("did you
    # mean") suggestion is offered.
    config.spell_max = 5

    # TO-DO: what about autsuggest? Do we want this?
    # Configuration for autocomplete suggestor
    #config.autocomplete_enabled = true
    #config.autocomplete_path = 'suggest'
  end
end
