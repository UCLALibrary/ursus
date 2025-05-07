# frozen_string_literal: true
require 'rails_helper'

RSpec.describe CatalogController, type: :controller do
  # rubocop:disable RSpec/ExpectActual
  describe 'routes' do
    it 'recognizes an ark' do
      expect(get: '/catalog/ark:/123/abc').to route_to(controller: 'catalog', action: 'show', id: 'ark:/123/abc')
    end

    it 'recognizes a content type extension' do
      expect(get: '/catalog/ark:/123/abc.json').to route_to(controller: 'catalog', action: 'show', id: 'ark:/123/abc', format: 'json')
    end

    it 'recognizes a URL query parameter' do
      expect(get: '/catalog/ark:/123/abc.json?cv=3').to route_to(controller: 'catalog', action: 'show', id: 'ark:/123/abc', format: 'json', cv: '3')
    end

    it 'recognizes a reversed ark' do
      # This will get forwarded, but that happens in #show, not in the route, so we don't test it here.
      expect(get: '/catalog/cba-321').to route_to(controller: 'catalog', action: 'show', id: 'cba-321')
    end
  end

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
        ['combined_subject',
         'human_readable_resource_type',
         'genre',
         'combined_names',
         'location',
         'year_isim',
         'human_readable_language',
         'generic_type',
         'member_of_collections',
         'repository',
         'program']
      end

      it 'has exactly expected facets' do
        expect(facets).to contain_exactly(*expected_facets)
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
        "alternative_title_tesim",
        "architect_tesim",
        "archival_collection_tesi",
        "ark_ssi",
        "arranger_tesim",
        "artist_tesim",
        "author_tesim",
        "based_near_label_tesim",
        "binding_note_ssi",
        "calligrapher_tesim",
        "caption_tesim",
        "cartographer_tesim",
        "citation_source_tesim",
        "collation_tesim",
        "collector_tesim",
        "colophon_tesim",
        "commentator_tesim",
        "composer_tesim",
        "condition_note_ssi",
        "content_disclaimer_ssm",
        "contents_note_tesim",
        "contributor_tesim",
        "creator_tesim",
        "date_created_tesim",
        "description_tesim",
        "dimensions_tesim",
        "director_tesim",
        "dlcs_collection_name_tesim",
        "edition_ssm",
        "editor_tesim",
        "electronic_locator_ss",
        "engraver_tesim",
        "extent_tesim",
        "features_tesim",
        "finding_aid_url_ssm",
        "foliation_tesim",
        "form_ssi",
        "format_book_tesim",
        "format_tesim",
        "funding_note_tesim",
        "genre_tesim",
        "geographic_coordinates_ssim",
        "hand_note_tesim",
        "history_tesim",
        "host_tesim",
        "human_readable_language_tesim",
        "human_readable_related_record_title_ssm",
        "human_readable_resource_type_tesim",
        "human_readable_rights_statement_tesim",
        "identifier_global_ssim",
        "identifier_tesim",
        "iiif_manifest_url_ssi",
        "illuminator_tesim",
        "illustrations_note_tesim",
        "illustrator_tesim",
        "inscription_tesim",
        "interviewee_tesim",
        "interviewer_tesim",
        "keyword_tesim",
        "latitude_tesim",
        "librettist_tesim",
        "license_tesim",
        "local_identifier_ssim",
        "local_rights_statement_ssm",
        "location_tesim",
        "longitude_tesim",
        "lyricist_tesim",
        "medium_tesim",
        "member_of_collections_ssim",
        "musician_tesim",
        "named_subject_tesim",
        "note_tesim",
        "oai_set_ssim",
        "oclc_ssi",
        "opac_url_ssi",
        "other_versions_tesim",
        "page_layout_ssim",
        "photographer_tesim",
        "place_of_origin_tesim",
        "printer_tesim",
        "printmaker_tesim",
        "producer_tesim",
        "program_tesim",
        "provenance_tesim",
        "publisher_tesim",
        "recipient_tesim",
        "related_to_ssm",
        "repository_tesim",
        "researcher_tesim",
        "resp_statement_tesim",
        "rights_country_tesim",
        "rights_holder_tesim",
        "rubricator_tesim",
        "scribe_tesim",
        "script_tesim",
        "series_tesim",
        "services_contact_ssm",
        "subject_cultural_object_tesim",
        "subject_domain_topic_tesim",
        "subject_geographic_tesim",
        "subject_temporal_tesim",
        "subject_tesim",
        "subject_topic_tesim",
        "summary_tesim",
        "support_tesim",
        "title_tesim",
        "toc_tesim",
        "translator_tesim",
        "uniform_title_tesim"
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
       'extent_tesim',
       'photographer_tesim',
       'member_of_collections']
    end
    it { expect(index_fields).to contain_exactly(*expected_index_fields) }
  end

  describe 'search fields' do
    let(:search_fields) { controller.blacklight_config.search_fields.keys }

    let(:expected_search_fields) do
      ['all_fields', 'subject_tesim subject_topic_tesim subject_geographic_tesim subject_temporal_tesim', 'title_tesim']
    end

    it { expect(search_fields).to contain_exactly(*expected_search_fields) }
  end

  describe "show action" do
    render_views

    before do
      allow(controller).to receive(:enforce_show_permissions).and_return(true)
      allow(controller).to receive(:search_service).and_return(search_service)
      allow(search_service).to receive(:fetch).and_return([mock_response, mock_document])
    end
    let(:doc_id) { 'ark:/123/abc' }
    let(:mock_response) { instance_double(Blacklight::Solr::Response) }
    let(:mock_document) { instance_double(SolrDocument, export_formats: {}) }
    let(:search_service) { instance_double(Blacklight::SearchService) }

    it "Renders a blank SolrDocument (meaning missing fields don\'t cause errors)" do
      get :show, params: { id: doc_id }
    end
  end

  describe '#cannonical_url_redirect', type: :request do
    # Use a request spec to include routing logic

    let(:solr_document) do
      SolrDocument.new(id: 'cba-321', ark_ssi: 'ark:/123/abc', has_model_ssim: 'Work')
    end

    before do
      allow_any_instance_of(CatalogController).to receive(:enforce_show_permissions).and_return true
      allow_any_instance_of(Blacklight::SearchService).to receive(:fetch).and_return [nil, solr_document]
      allow(SolrDocument).to receive(:find).and_return solr_document
    end

    it 'does not redirect a properly-formatted URL' do
      expect(get('/catalog/ark:/123/abc')).not_to redirect_to('/catalog/ark:/123/abc')
    end

    it 'redirects an escaped ARK to the unescaped version, without query parameters' do
      expect(get('/catalog/ark:%2F123%2Fabc')).to redirect_to('/catalog/ark:/123/abc')
    end

    it 'redirects an escaped ARK to the unescaped version, with query parameters' do
      expect(get('/catalog/ark:%2F123%2Fabc?cv=5')).to redirect_to('/catalog/ark:/123/abc?cv=5')
    end

    it 'redirects a reversed ARK to the full ARK, without query parameters' do
      expect(get('/catalog/cba-321')).to redirect_to('/catalog/ark:/123/abc')
    end

    it 'redirects a reversed ARK to the full ARK, with query parameters' do
      expect(get('/catalog/cba-321?cv=921')).to redirect_to('/catalog/ark:/123/abc?cv=921')
    end

    it 'does not redirect something that looks like a reversed ARK but doesn\'t lead to a record in Solr' do
      allow_any_instance_of(Blacklight::SearchService).to receive(:fetch).and_raise(Blacklight::Exceptions::RecordNotFound)
      expect(get('/catalog/ark:%2F123%2Fabc?cv=5')).not_to redirect_to('/catalog/ark:/123/abc?cv=921')
    end

    context 'when the URL contains the ID of a hyrax object without an ark (e.g. a permissions object)' do
      let(:solr_document) { SolrDocument.new(id: 'cba-321') }

      before do
        allow(SolrDocument).to receive(:find).and_call_original
      end

      it 'catches not_found and renders errors/not_found' do
        expect(get('/catalog/cba-321')).to render_template('errors/not_found')
      end

      it 'raises an exception' do
        expect { get('/catalog/cba-321') }.not_to raise_exception(Blacklight::Exceptions::RecordNotFound)
      end
    end
  end
end
