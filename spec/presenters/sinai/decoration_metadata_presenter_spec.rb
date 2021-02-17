# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::DecorationMetadataPresenter do
  let(:solr_doc) do
    {
      'illustrations_note_tesim' => 'Illustrations note'
    }
  end
  #let(:solr_doc_missing_items) do
  #  {
  #    'illustrations_note_tesim' => 'Illustrations note'
  #  }
  #end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/decoration_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe 'config' do
      it 'returns the Illustrations note' do
        expect(config['illustrations_note_tesim'].to_s).to eq('Illustrations note')
      end

    end

    describe "#decoration_terms" do
      let(:all) { presenter_object.decoration_terms.keys.length }
      let(:missing) { presenter_object_missing_items.decoration_terms.keys.length }

      it "returns existing keys" do
        expect(presenter_object.decoration_terms).to be_instance_of(Hash)
        expect(all).to eq 1
        expect(config.length).to eq all
      end

      #it "is missing some elements" do
      #  expect(all - missing).to_not eq 0
      #  expect(config.length - missing).to_not eq 0
      #end
    end
  end
end
