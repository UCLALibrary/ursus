# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::KeywordMetadataPresenter do
  let(:solr_doc) do
    {
      'genre_tesim' => 'Genre',
      'subject_tesim' => 'Subject',
      'subject_topic_tesim' => 'Subject topic',
      'named_subject_tesim' => 'Named Subject',
      'subject_geographic_tesim' => 'Subject geographic',
      'subject_temporal_tesim' => 'Subject temporal',
      'location_tesim' => 'Location',
      'latitude_tesim' => 'Latitude',
      'longitude_tesim' => 'Longitude',
      'human_readable_resource_type_tesim' => 'Resource Type',
      'features_tesim' => 'Features'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'genre_tesim' => 'Genre',
      'features_tesim' => 'Features',
      'subject_tesim' => 'Subject'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/keyword_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe 'config' do
      it 'returns the Genre Key' do
        expect(config['genre_tesim'].to_s).to eq('Genre')
      end

      it 'returns the Subject Key' do
        expect(config['subject_tesim'].to_s).to eq('Subject')
      end

      it 'returns the Subject topic Key' do
        expect(config['subject_topic_tesim'].to_s).to eq('Subject topic')
      end

      it 'returns the Named Subject Key' do
        expect(config['named_subject_tesim'].to_s).to eq('Named Subject')
      end

      it 'returns the Subject geographic Key' do
        expect(config['subject_geographic_tesim'].to_s).to eq('Subject geographic')
      end

      it 'returns the Subject temporal Key' do
        expect(config['subject_temporal_tesim'].to_s).to eq('Subject temporal')
      end

      it 'returns the Location Key' do
        expect(config['location_tesim'].to_s).to eq('Location')
      end

      it 'returns the Latitude Key' do
        expect(config['latitude_tesim'].to_s).to eq('Latitude')
      end

      it 'returns the Longitude Key' do
        expect(config['longitude_tesim'].to_s).to eq('Longitude')
      end

      it 'returns the Resource Type Key' do
        expect(config['human_readable_resource_type_tesim'].to_s).to eq('Resource Type')
      end

      it 'returns the Features Key' do
        expect(config['features_tesim'].to_s).to eq('Features')
      end
    end

    describe "#keyword terms" do
      let(:all) { presenter_object.keyword_terms.keys.length }
      let(:missing) { presenter_object_missing_items.keyword_terms.keys.length }

      it "returns existing keys" do
        expect(presenter_object.keyword_terms).to be_instance_of(Hash)
        expect(all).to eq 11
        expect(config.length).to eq all
      end

      it "is missing some elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
