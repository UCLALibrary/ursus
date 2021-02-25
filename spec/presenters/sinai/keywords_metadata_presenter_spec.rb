# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::KeywordsMetadataPresenter do
  let(:solr_doc) do
    {
      'keywords_tesim' => 'Keywords'
    }
  end
  let(:solr_doc_missing_items) do
    {
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/keywords_metadata.yml'))) }

  context 'with a solr document containing keywords metadata' do
    describe '#terms' do
      it 'returns the Keywords Key' do
        expect(config['keywords_tesim'].to_s).to eq('Keywords')
      end
    end

    describe "#keywords_terms terms" do
      let(:all) { presenter_object.keywords_terms.keys.length }
      let(:missing) { presenter_object_missing_items.keywords_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 1
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
