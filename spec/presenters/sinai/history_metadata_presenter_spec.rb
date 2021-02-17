# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::HistoryMetadataPresenter do
  let(:solr_doc) do
    {
      'date_created_tesim' => 'Date created',
      'scribe_tesim' => 'Scribe',
      'place_of_origin_tesim' => 'Place of Origin',
      'colophon_tesim' => 'Colophon',
      'hand_note_tesim' => 'Hand note',
      'script_tesim' => 'Script note',
      'provenance_tesim' => 'Provenance'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'date_created_tesim' => 'Date created',
      'scribe_tesim' => 'Scribe',
      'place_of_origin_tesim' => 'Place of Origin'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/history_metadata.yml'))) }

  context 'with a solr document containing history metadata' do
    describe '#terms' do
      it 'returns the Date created Key' do
        expect(config['date_created_tesim'].to_s).to eq('Date created')
      end

      it 'returns the Scribe Key' do
        expect(config['scribe_tesim'].to_s).to eq('Scribe')
      end

      it 'returns the Place of Origin Key' do
        expect(config['place_of_origin_tesim'].to_s).to eq('Place of Origin')
      end

      it 'returns the Colophon Key' do
        expect(config['colophon_tesim'].to_s).to eq('Colophon')
      end

      it 'returns the Hand note Key' do
        expect(config['hand_note_tesim'].to_s).to eq('Hand note')
      end

      it 'returns the Script note Key' do
        expect(config['script_tesim'].to_s).to eq('Script note')
      end

      it 'returns the Provenance Key' do
        expect(config['provenance_tesim'].to_s).to eq('Provenance')
      end
    end

    describe "#history_terms terms" do
      let(:all) { presenter_object.history_terms.keys.length }
      let(:missing) { presenter_object_missing_items.history_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 7
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
