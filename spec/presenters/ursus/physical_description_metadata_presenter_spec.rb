# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::PhysicalDescriptionMetadataPresenter do
  let(:solr_doc) do
    {
      'extent_tesim' => 'Extent',
      'dimensions_tesim' => 'Dimensions',
      'collation_tesim' => 'Collation',
      'foliation_tesim' => 'Foliation',
      'format_tesim' => 'Format',
      'medium_tesim' => 'Medium',
      'support_tesim' => 'Support',
      'page_layout_ssim' => 'Page layout',
      'illustrations_note_tesim' => 'Illustrations note',
      'condition_note_ssi' => 'Condition note',
      'binding_note_ssi' => 'Binding note',
      'form_ssi' => 'Form'
    }
  end
  let(:solr_doc_missing_items) do
    { 'extent_tesim' => 'Extent' }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/physical_description_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe 'config' do
      it 'returns the Binding note Key' do
        expect(config['binding_note_ssi'].to_s).to eq 'Binding note'
      end

      it 'returns the Collation Key' do
        expect(config['collation_tesim'].to_s).to eq 'Collation'
      end

      it 'returns the Condition note Key' do
        expect(config['condition_note_ssi'].to_s).to eq 'Condition note'
      end

      it 'returns the Dimensions Key' do
        expect(config['dimensions_tesim'].to_s).to eq 'Dimensions'
      end

      it 'returns the Extent Key' do
        expect(config['extent_tesim'].to_s).to eq 'Extent'
      end

      it 'returns the Foliation Key' do
        expect(config['foliation_tesim'].to_s).to eq 'Foliation'
      end

      it 'returns the Format Key' do
        expect(config['format_tesim'].to_s).to eq 'Format'
      end

      it 'returns the Illustrations note Key' do
        expect(config['illustrations_note_tesim'].to_s).to eq 'Illustrations note'
      end

      it 'returns the Medium Key' do
        expect(config['medium_tesim'].to_s).to eq 'Medium'
      end

      it 'returns the Page layout note Key' do
        expect(config['page_layout_ssim'].to_s).to eq 'Page layout'
      end

      it 'returns the Support Key' do
        expect(config['support_tesim'].to_s).to eq 'Support'
      end
    end

    describe "#physical_description terms" do
      let(:all) { presenter_object.physical_description_terms.keys.length }
      let(:missing) { presenter_object_missing_items.physical_description_terms.keys.length }

      it "returns existing keys" do
        expect(presenter_object.physical_description_terms).to be_instance_of(Hash)
        expect(all).to eq 12
        expect(config.length).to eq all
      end

      it "is missing some elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
