# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::ReferencesMetadataPresenter do
  let(:solr_doc) do
    {
      'references_tesim' => 'References',
      'other_versions_tesim' => 'Other version(s)'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'references_tesim' => 'References'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/references_metadata.yml'))) }

  context 'with a solr document containing references metadata' do
    describe '#terms' do
      it 'returns the Title Key' do
        expect(config['references_tesim'].to_s).to eq('References')
      end
      
      it 'returns the Title Key' do
        expect(config['other_versions_tesim'].to_s).to eq('Other version(s)')
      end
      
    end
  
    describe "#references_terms terms" do
      let(:all) { presenter_object.references_terms.keys.length }
      let(:missing) { presenter_object_missing_items.references_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 2
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
