# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::ContentsMetadataPresenter do
  let(:solr_doc) do
    {
      'descriptive_title_tesim' => 'Descriptive title',
      'uniform_title_tesim' => 'Uniform title',
      'alternative_title_tesim' => 'Alternative title',
      'incipit_tesim' => 'Incipit',
      'explicit_tesim' => 'Explicit',
      'author_tesim' => 'Author',
      'associated_name_tesim' => 'Associated Name',
      'contents_note_tesim' => 'Contents note'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'descriptive_title_tesim' => 'Descriptive title',
      'uniform_title_tesim' => 'Uniform title',
      'alternative_title_tesim' => 'Alternative title',
      'incipit_tesim' => 'Incipit'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/contents_metadata.yml'))) }

  context 'with a solr document containing contents metadata' do
    describe '#terms' do
      it 'returns the Descriptive title Key' do
        expect(config['descriptive_title_tesim'].to_s).to eq('Descriptive title')
      end

      it 'returns the Uniform title Key' do
        expect(config['uniform_title_tesim'].to_s).to eq('Uniform title')
      end

      it 'returns the Alternative title Key' do
        expect(config['alternative_title_tesim'].to_s).to eq('Alternative title')
      end

      it 'returns the Incipit Key' do
        expect(config['incipit_tesim'].to_s).to eq('Incipit')
      end

      it 'returns the Explicit Key' do
        expect(config['explicit_tesim'].to_s).to eq('Explicit')
      end

      it 'returns the Author Key' do
        expect(config['author_tesim'].to_s).to eq('Author')
      end

      it 'returns the Associated Name Key' do
        expect(config['associated_name_tesim'].to_s).to eq('Associated Name')
      end

      it 'returns the Title Key' do
        expect(config['contents_note_tesim'].to_s).to eq('Contents note')
      end
    end

    describe "#contents_terms terms" do
      let(:all) { presenter_object.contents_terms.keys.length }
      let(:missing) { presenter_object_missing_items.contents_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 8
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
