# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::KeywordMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/keyword_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#keyword_terms' do
      it 'returns the Genre Key' do
        expect(config['genre_tesim'].to_s).to eq('Genre')
      end

      it 'returns the Features Key' do
        expect(config['features_tesim'].to_s).to eq('Features')
      end

      it 'returns the Subject Key' do
        expect(config['subject_tesim'].to_s).to eq('Subject')
      end

      it 'returns the Named Subject Key' do
        expect(config['named_subject_tesim'].to_s).to eq('Named Subject')
      end

      it 'returns the Subject topic Key' do
        expect(config['subject_topic_tesim'].to_s).to eq('Subject topic')
      end

      it 'returns the Location Key' do
        expect(config['location_tesim'].to_s).to eq('Location')
      end

      it 'returns the Longitude Key' do
        expect(config['longitude_tesim'].to_s).to eq('Longitude')
      end

      it 'returns the Latitude Key' do
        expect(config['latitude_tesim'].to_s).to eq('Latitude')
      end

      it 'returns the Resource Type Key' do
        expect(config['human_readable_resource_type_tesim'].to_s).to eq('Resource Type')
      end
    end
  end
end
