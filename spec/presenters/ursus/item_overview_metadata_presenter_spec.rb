# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::ItemOverviewMetadataPresenter do
  let(:solr_doc) do
    {
      'alternative_title_tesim' => 'Alternative Title',
      'architect_tesim' => 'Architect',
      'author_tesim' => 'Author',
      'calligrapher_tesim' => 'Calligrapher',
      'commentator_tesim' => 'Commentator',
      'composer_tesim' => 'Composer',
      'creator_tesim' => 'Creator',
      'date_created_tesim' => 'Date Created',
      'editor_tesim' => 'Editor',
      'engraver_tesim' => 'Engraver',
      'human_readable_language_tesim' => 'Language',
      'illuminator_tesim' => 'Illuminator',
      'illustrator_tesim' => 'Illustrator',
      'lyricist_tesim' => 'Lyricist',
      'member_of_collections_ssim' => 'Collection',
      'normalized_date_sim' => 'Date',
      'photographer_tesim' => 'Photographer',
      'place_of_origin_tesim' => 'Place of Origin',
      'printmaker_tesim' => 'Printmaker',
      'publisher_tesim' => 'Publisher',
      'rubricator_tesim' => 'Rubricator',
      'scribe_tesim' => 'Scribe',
      'title_tesim' => 'Title',
      'translator_tesim' => 'Translator',
      'uniform_title_tesim' => 'Uniform title',
      'year_isim' => 'Year',
      'shelfmark_ssi' => 'Shelfmark',
      'descriptive_title_tesim' => 'Descriptive title',
      'references_tesim' => 'References',
      'associated_name_tesim' => 'Associated name'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'date_created_tesim' => 'Date Created',
      'human_readable_language_tesim' => 'Language',
      'member_of_collections_ssim' => 'Collection',
      'contents_note_tesim' => 'Contents note',
      'incipit_tesim' => 'Incipit',
      'explicit_tesim' => 'Explicit'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/item_overview_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Sinai Title Key' do
        expect(config['title_tesim'].to_s).to eq('Title')
      end

      it 'returns the Alternative Title Key' do
        expect(config['alternative_title_tesim'].to_s).to eq('Alternative Title')
      end

      it 'returns the Uniform Title Key' do
        expect(config['uniform_title_tesim'].to_s).to eq('Uniform title')
      end

      it 'returns the Creator Key' do
        expect(config['creator_tesim'].to_s).to eq('Creator')
      end

      it 'returns the Author Key' do
        expect(config['author_tesim'].to_s).to eq('Author')
      end

      it 'returns the Editor Key' do
        expect(config['editor_tesim'].to_s).to eq('Editor')
      end

      it 'returns the Photographer Key' do
        expect(config['photographer_tesim'].to_s).to eq('Photographer')
      end

      it 'returns the Architect Key' do
        expect(config['architect_tesim'].to_s).to eq('Architect')
      end

      it 'returns the Illuminator Key' do
        expect(config['illuminator_tesim'].to_s).to eq('Illuminator')
      end

      it 'returns the Illustrator Key' do
        expect(config['illustrator_tesim'].to_s).to eq('Illustrator')
      end

      it 'returns the Engraver Key' do
        expect(config['engraver_tesim'].to_s).to eq('Engraver')
      end

      it 'returns the Printmaker Key' do
        expect(config['printmaker_tesim'].to_s).to eq('Printmaker')
      end

      it 'returns the Scribe Key' do
        expect(config['scribe_tesim'].to_s).to eq('Scribe')
      end

      it 'returns the Translator Key' do
        expect(config['translator_tesim'].to_s).to eq('Translator')
      end

      it 'returns the Rubricator Key' do
        expect(config['rubricator_tesim'].to_s).to eq('Rubricator')
      end

      it 'returns the Calligrapher Key' do
        expect(config['calligrapher_tesim'].to_s).to eq('Calligrapher')
      end

      it 'returns the Commentator Key' do
        expect(config['commentator_tesim'].to_s).to eq('Commentator')
      end

      it 'returns the Lyricist Key' do
        expect(config['lyricist_tesim'].to_s).to eq('Lyricist')
      end

      it 'returns the Composer Key' do
        expect(config['composer_tesim'].to_s).to eq('Composer')
      end

      it 'returns the Date Created Key' do
        expect(config['date_created_tesim'].to_s).to eq('Date Created')
      end

      it 'returns the Date Key' do
        expect(config['normalized_date_sim'].to_s).to eq('Date')
      end

      it 'returns the Year Key' do
        expect(config['year_isim'].to_s).to eq('Year')
      end

      it 'returns the Place of Origin Key' do
        expect(config['place_of_origin_tesim'].to_s).to eq('Place of Origin')
      end

      it 'returns the Publisher Key' do
        expect(config['publisher_tesim'].to_s).to eq('Publisher')
      end

      it 'returns the Language Key' do
        expect(config['human_readable_language_tesim'].to_s).to eq('Language')
      end

      it 'returns the Collection Key' do
        expect(config['member_of_collections_ssim'].to_s).to eq('Collection')
      end
    end

    describe "#overview_terms terms" do
      let(:all) { presenter_object.overview_terms.keys.length }
      let(:missing) { presenter_object_missing_items.overview_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 30
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
