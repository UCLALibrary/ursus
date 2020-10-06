# frozen_string_literal: true
require 'rails_helper'

RSpec.describe CatalogController, type: :controller do
  describe 'facets' do
    context 'in the default site' do
      before do
        allow(Flipflop).to receive(:sinai?).and_return(false)
      end

      let(:facets) do
        controller
          .blacklight_config
          .facet_fields.keys
          .map { |field| field.gsub(/\_s+im$/, '') }
      end

      let(:expected_facets) do
        ['subject',
         'human_readable_resource_type',
         'genre',
         'named_subject',
         'location',
         'year_isim',
         'human_readable_language',
         'generic_type',
         'member_of_collections']
      end

      it 'has exactly expected facets' do
        expect(facets).to contain_exactly(*expected_facets)
      end
    end

    xcontext 'in the sinai site' do
      before do
        allow(Flipflop).to receive(:sinai?).and_return(true)
      end

      let(:facets_sinai) do
        controller
          .blacklight_config
          .facet_fields.keys
          .map { |field| field.gsub(/\_s+im$/, '') }
      end

      let(:expected_facets) do
        ['genre',
         'place_of_origin',
         'year_isim',
         'human_readable_language',
         'support']
      end

      it 'has exactly expected facets' do
        expect(facets_sinai).to contain_exactly(*expected_facets)
      end
    end
  end

  describe "show fields" do
    let(:show_fields) do
      controller
        .blacklight_config
        .show_fields.keys
    end
    let(:expected_show_fields) do
      [
        'title_tesim', 'alternative_title_tesim', 'uniform_title_tesim', 'photographer_tesim',
        'architect_tesim', 'author_tesim', 'illuminator_tesim',
        'scribe_tesim', 'rubricator_tesim', 'commentator_tesim', 'translator_tesim',
        'lyricist_tesim', 'composer_tesim', 'illustrator_tesim', 'editor_tesim',
        'calligrapher_tesim', 'engraver_tesim', 'printmaker_tesim', 'date_created_tesim',
        'place_of_origin_tesim', 'publisher_tesim', 'human_readable_language_tesim',
        'member_of_collections_ssim', 'creator_tesim', 'explicit_tesim', 'features_tesim',
        'incipit_tesim', 'inscription_tesim', 'script_tesim', 'writing_and_hands_tesim',
        'writing_system_tesim', 'summary_tesim', 'description_tesim', 'caption_tesim',
        'toc_tesim', 'contents_note_tesim', 'provenance_tesim', 'colophon_tesim',
        'note_tesim', 'format_tesim', 'medium_tesim', 'support_tesim','extent_tesim',
        'dimensions_tesim', 'page_layout_ssim', 'binding_note_ssi', 'condition_note_ssi',
        'collation_tesim', 'foliation_tesim', 'illustrations_note_tesim',
        'human_readable_resource_type_tesim', 'genre_tesim', 'subject_tesim',
        'named_subject_tesim', 'subject_topic_tesim', 'location_tesim', 'latitude_tesim',
        'longitude_tesim', 'geographic_coordinates_ssim', 'repository_tesim',
        'local_identifier_ssm', 'oclc_ssi', 'iiif_manifest_url_ssi', 'finding_aid_url_ssm',
        'opac_url_ssi', 'ark_ssi', 'local_rights_statement_ssim', 'rights_country_tesim',
        'rights_holder_tesim', 'services_contact_ssm', 'funding_note_tesim',
        'contributor_tesim',  'dlcs_collection_name_tesim', 'identifier_tesim',
        'keyword_tesim', 'based_near_label_tesim', 'license_tesim',
        'subject_geographic_tesim', 'subject_temporal_tesim'
      ]
    end

    it 'has exactly expected show fields' do
      expect(show_fields).to contain_exactly(*expected_show_fields)
    end
  end

  describe "sort fields" do
    let(:sort_fields) do
      controller
        .blacklight_config
        .sort_fields.keys
    end

    let(:expected_sort_fields) do
      ["score desc", "title_alpha_numeric_ssort asc", "title_alpha_numeric_ssort desc", "date_dtsort desc", "date_dtsort asc"]
    end

    it 'has exactly expected sort fields' do
      expect(sort_fields).to contain_exactly(*expected_sort_fields)
    end
  end

  describe 'index fields' do
    let(:index_fields) do
      controller
        .blacklight_config
        .index_fields.keys
        .map { |field| field.gsub(/\_s+im$/, '') }
    end

    let(:expected_index_fields) do
      ['description_tesim',
       'date_created_tesim',
       'human_readable_resource_type_tesim',
       'photographer_tesim',
       'member_of_collections']
    end
    it { expect(index_fields).to contain_exactly(*expected_index_fields) }
  end

  describe 'search fields' do
    let(:search_fields) { controller.blacklight_config.search_fields.keys }

    let(:expected_search_fields) do
      ['all_fields', 'subject_tesim', 'title_tesim']
    end

    it { expect(search_fields).to contain_exactly(*expected_search_fields) }
  end

  xdescribe "show action" do
    before do
      # allow(controller).to receive(:search_service).and_return(search_service)
      # expect(search_service).to receive(:fetch).and_return([mock_response, mock_document])
    end
    # let(:doc_id) { '2007020969' }
    # let(:mock_response) { instance_double(Blacklight::Solr::Response) }
    # let(:mock_document) { instance_double(SolrDocument, export_formats: {}) }
    # let(:search_service) { instance_double(Blacklight::SearchService) }

    it "has collection count on Collection Item record page" do
      # get :show, params: { id: doc_id }
      # expect(assigns[:document]).not_to be_nil
    end
  end
end
