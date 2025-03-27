# frozen_string_literal: true
require 'rails_helper'
require 'support/solr_doc_double'

include SolrDocDouble

RSpec.describe Ursus::ItemOverviewMetadataPresenter do
  let(:solr_doc) do
    doc_double_with_fields_to_render(
      'alternative_title_tesim' => 'Alternative Title',
      'architect_tesim' => 'Architect',
      'arranger_tesim' => 'Arranger',
      'artist_tesim' => 'Artist',
      'associated_name_tesim' => 'Associated name',
      'author_tesim' => 'Author',
      'calligrapher_tesim' => 'Calligrapher',
      'cartographer_tesim' => 'Cartographer',
      'collector_tesim' => 'Collector',
      'commentator_tesim' => 'Commentator',
      'composer_tesim' => 'Composer',
      'content_disclaimer_ssm' => 'Content Disclaimer',
      'creator_tesim' => 'Creator',
      'date_created_tesim' => 'Date Created',
      'descriptive_title_tesim' => 'Descriptive title',
      'director_tesim' => 'Director',
      'edition_ssm' => 'Edition',
      'editor_tesim' => 'Editor',
      'engraver_tesim' => 'Engraver',
      'host_tesim' => 'Host',
      'human_readable_language_tesim' => 'Language',
      'illuminator_tesim' => 'Illuminator',
      'illustrator_tesim' => 'Illustrator',
      'interviewee_tesim' => 'Interviewee',
      'interviewer_tesim' => 'Interviewer',
      'librettist_tesim' => 'Librettist',
      'lyricist_tesim' => 'Lyricist',
      'member_of_collections_ssim' => 'Collection',
      'musician_tesim' => 'Musician',
      'normalized_date_sim' => 'Date',
      'photographer_tesim' => 'Photographer',
      'place_of_origin_tesim' => 'Place of Origin',
      'printer_tesim' => 'Printer',
      'printmaker_tesim' => 'Printmaker',
      'producer_tesim' => 'Producer',
      'program_tesim' => 'Program',
      'publisher_tesim' => 'Publisher',
      'recipient_tesim' => 'Recipient',
      'references_tesim' => 'References',
      'researcher_tesim' => 'Researcher',
      'rubricator_tesim' => 'Rubricator',
      'scribe_tesim' => 'Scribe',
      'script_tesim' => 'Script',
      'series_tesim' => 'Series',
      'shelfmark_ssi' => 'Shelfmark',
      'title_tesim' => 'Title',
      'translator_tesim' => 'Translator',
      'uniform_title_tesim' => 'Uniform title',
      'year_isim' => 'Year'
    )
  end
  let(:solr_doc_missing_items) do
    doc_double_with_fields_to_render(
      'date_created_tesim' => 'Date Created',
      'human_readable_language_tesim' => 'Language',
      'member_of_collections_ssim' => 'Collection',
      'contents_note_tesim' => 'Contents note',
      'incipit_tesim' => 'Incipit',
      'explicit_tesim' => 'Explicit'
    )
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/item_overview_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Alternative Title Key' do
        expect(config['alternative_title_tesim'].to_s).to eq('Alternative Title')
      end

      it 'returns the Architect Key' do
        expect(config['architect_tesim'].to_s).to eq('Architect')
      end

      it 'returns the Artist Key' do
        expect(config['artist_tesim'].to_s).to eq('Artist')
      end

      it 'returns the Arranger key' do
        expect(config['arranger_tesim'].to_s).to eq('Arranger')
      end

      it 'returns the Author Key' do
        expect(config['author_tesim'].to_s).to eq('Author')
      end

      it 'returns the Calligrapher Key' do
        expect(config['calligrapher_tesim'].to_s).to eq('Calligrapher')
      end

      it 'returns the Cartographer Key' do
        expect(config['cartographer_tesim'].to_s).to eq('Cartographer')
      end

      it 'returns the Collection Key' do
        expect(config['member_of_collections_ssim'].to_s).to eq('Collection')
      end

      it 'returns the Collector key' do
        expect(config['collector_tesim'].to_s).to eq('Collector')
      end

      it 'returns the Series Key' do
        expect(config['series_tesim'].to_s).to eq 'Series'
      end

      it 'returns the Commentator Key' do
        expect(config['commentator_tesim'].to_s).to eq('Commentator')
      end

      it 'returns the Composer Key' do
        expect(config['composer_tesim'].to_s).to eq('Composer')
      end

      it 'returns the Content Disclaimer Key' do
        expect(config['content_disclaimer_ssm'].to_s).to eq('Content Disclaimer')
      end

      it 'returns the Date Created Key' do
        expect(config['date_created_tesim'].to_s).to eq('Date Created')
      end

      it 'returns the Date Key' do
        expect(config['normalized_date_sim'].to_s).to eq('Date')
      end

      it 'returns the Creator Key' do
        expect(config['creator_tesim'].to_s).to eq('Creator')
      end

      it 'returns the Director Key' do
        expect(config['director_tesim'].to_s).to eq('Director')
      end

      it 'returns the Edition Key' do
        expect(config['edition_ssm'].to_s).to eq('Edition')
      end

      it 'returns the Editor Key' do
        expect(config['editor_tesim'].to_s).to eq('Editor')
      end

      it 'returns the Engraver Key' do
        expect(config['engraver_tesim'].to_s).to eq('Engraver')
      end

      it 'returns the Illuminator Key' do
        expect(config['illuminator_tesim'].to_s).to eq('Illuminator')
      end

      it 'returns the Illustrator Key' do
        expect(config['illustrator_tesim'].to_s).to eq('Illustrator')
      end

      it 'returns the Interviewee Key' do
        expect(config['interviewee_tesim'].to_s).to eq('Interviewee')
      end

      it 'returns the Interviewer Key' do
        expect(config['interviewer_tesim'].to_s).to eq('Interviewer')
      end

      it 'returns the Language Key' do
        expect(config['human_readable_language_tesim'].to_s).to eq('Language')
      end

      it 'returns the Librettist key' do
        expect(config['librettist_tesim'].to_s).to eq('Librettist')
      end

      it 'returns the Lyricist Key' do
        expect(config['lyricist_tesim'].to_s).to eq('Lyricist')
      end

      it 'returns the Place of Origin Key' do
        expect(config['place_of_origin_tesim'].to_s).to eq('Place of Origin')
      end

      it 'returns the Photographer Key' do
        expect(config['photographer_tesim'].to_s).to eq('Photographer')
      end

      it 'returns the Printmaker Key' do
        expect(config['printmaker_tesim'].to_s).to eq('Printmaker')
      end

      it 'returns the Producer Key' do
        expect(config['producer_tesim'].to_s).to eq('Producer')
      end

      it 'returns the Publisher Key' do
        expect(config['publisher_tesim'].to_s).to eq('Publisher')
      end

      it 'returns the Recipient Key' do
        expect(config['recipient_tesim'].to_s).to eq('Recipient')
      end

      it 'returns the Rubricator Key' do
        expect(config['rubricator_tesim'].to_s).to eq('Rubricator')
      end

      it 'returns the Scribe Key' do
        expect(config['scribe_tesim'].to_s).to eq('Scribe')
      end

      it 'returns the Translator Key' do
        expect(config['translator_tesim'].to_s).to eq('Translator')
      end

      it 'returns the Uniform Title Key' do
        expect(config['uniform_title_tesim'].to_s).to eq('Uniform title')
      end

      it 'returns the Year Key' do
        expect(config['year_isim'].to_s).to eq('Year')
      end

      it 'returns the Associated name Key' do
        expect(config['associated_name_tesim'].to_s).to eq('Associated name')
      end

      it 'returns the Descriptive title Key' do
        expect(config['descriptive_title_tesim'].to_s).to eq('Descriptive title')
      end

      it 'returns the References' do
        expect(config['references_tesim'].to_s).to eq('References')
      end

      it 'returns the Shelfmark Key' do
        expect(config['shelfmark_ssi'].to_s).to eq('Shelfmark')
      end

      it 'returns the ProgramKey' do
        expect(config['program_tesim'].to_s).to eq('Program')
      end

      it 'returns the Script key' do
        expect(config['script_tesim'].to_s).to eq('Script')
      end
    end

    describe "#overview_terms terms" do
      let(:all) { presenter_object.overview_terms.keys.length }
      let(:missing) { presenter_object_missing_items.overview_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 49
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
