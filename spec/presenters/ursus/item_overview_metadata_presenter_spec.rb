# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::ItemOverviewMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/item_overview_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Title Key' do
        expect(config['title_tesim'].to_s).to eq('Title')
      end

      it 'returns the Alternative Title Key' do
        expect(config['alternative_title_tesim'].to_s).to eq('Alternative Title')
      end

      it 'returns the Uniform Title Key' do
        expect(config['uniform_title_tesim'].to_s).to eq('Uniform title')
      end

      it 'returns the Author Key' do
        expect(config['author_tesim'].to_s).to eq('Author')
      end

      it 'returns the Architect Key' do
        expect(config['architect_tesim'].to_s).to eq('Architect')
      end

      it 'returns the Photographer Key' do
        expect(config['photographer_tesim'].to_s).to eq('Photographer')
      end

      it 'returns the Composer Key' do
        expect(config['composer_tesim'].to_s).to eq('Composer')
      end

      it 'returns the Scribe Key' do
        expect(config['scribe_tesim'].to_s).to eq('Scribe')
      end

      it 'returns the Illuminator Key' do
        expect(config['illuminator_tesim'].to_s).to eq('Illuminator')
      end

      it 'returns the Lyricist Key' do
        expect(config['lyricist_tesim'].to_s).to eq('Lyricist')
      end

      it 'returns the Publisher Key' do
        expect(config['publisher_tesim'].to_s).to eq('Publisher')
      end

      it 'returns the Place of Origin Key' do
        expect(config['place_of_origin_tesim'].to_s).to eq('Place of Origin')
      end

      it 'returns the Year Key' do
        expect(config['year_isim'].to_s).to eq('Year')
      end

      it 'returns the Date Key' do
        expect(config['normalized_date_sim'].to_s).to eq('Date')
      end

      it 'returns the Date Created Key' do
        expect(config['date_created_tesim'].to_s).to eq('Date Created')
      end

      it 'returns the Language Key' do
        expect(config['human_readable_language_tesim'].to_s).to eq('Language')
      end

      it 'returns the Collection Key' do
        expect(config['member_of_collections_ssim'].to_s).to eq('Collection')
      end

      it 'returns the Contents note Key' do
        expect(config['contents_note_tesim'].to_s).to eq('Contents note')
      end

      it 'returns the Colophon Key' do
        expect(config['colophon_tesim'].to_s).to eq('Colophon')
      end

      it 'returns the Incipit Key' do
        expect(config['incipit_tesim'].to_s).to eq('Incipit')
      end

      it 'returns the Explicit Key' do
        expect(config['explicit_tesim'].to_s).to eq('Explicit')
      end
    end
  end
end
