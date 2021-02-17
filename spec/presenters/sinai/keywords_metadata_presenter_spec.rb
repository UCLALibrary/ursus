# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::KeywordsMetadataPresenter do
  let(:solr_doc) do
    {
      'genre_tesim' => 'Genre',
      'features_tesim' => 'Features',
      'place_of_origin_tesim' => 'Place of Origin',
      'support_tesim' => 'Support',
      'form_ssi' => 'Form'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'genre_tesim' => 'Genre',
      'features_tesim' => 'Features',
      'place_of_origin_tesim' => 'Place of Origin'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/keywords_metadata.yml'))) }

  context 'with a solr document containing keywords metadata' do
    describe '#terms' do
      it 'returns the Title Key' do
        expect(config['genre_tesim'].to_s).to eq('Genre')
      end
      
      it 'returns the Title Key' do
        expect(config['features_tesim'].to_s).to eq('Features')
      end
      
      it 'returns the Title Key' do
        expect(config['place_of_origin_tesim'].to_s).to eq('Place of Origin')
      end
      
      it 'returns the Title Key' do
        expect(config['support_tesim'].to_s).to eq('Support')
      end
      
      it 'returns the Title Key' do
        expect(config['form_ssi'].to_s).to eq('Form')
      end

    end
  
    describe "#keywords_terms terms" do
      let(:all) { presenter_object.keywords_terms.keys.length }
      let(:missing) { presenter_object_missing_items.keywords_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 5
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
