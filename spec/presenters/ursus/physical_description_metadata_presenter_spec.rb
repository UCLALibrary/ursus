# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::PhysicalDescriptionMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/physical_description_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Binding note Key' do
        expect(config['binding_note_tesim'].to_s).to eq 'Binding note'
      end

      it 'returns the Collation Key' do
        expect(config['collation_tesim'].to_s).to eq 'Collation'
      end

      it 'returns the Condition note Key' do
        expect(config['condition_note_tesim'].to_s).to eq 'Condition note'
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

      it 'returns the Incription note Key' do
        expect(config['inscription_tesim'].to_s).to eq 'Inscription'
      end

      it 'returns the Medium Key' do
        expect(config['medium_tesim'].to_s).to eq 'Medium'
      end

      it 'returns the Page layout note Key' do
        expect(config['page_layout_ssim'].to_s).to eq 'Page layout'
      end

      it 'returns the Script Key' do
        expect(config['script_tesim'].to_s).to eq 'Script'
      end

      it 'returns the Support Key' do
        expect(config['support_tesim'].to_s).to eq 'Support'
      end

      it 'returns the Wrtiting and hands Key' do
        expect(config['writing_and_hands_tesim'].to_s).to eq 'Writing and hands'
      end

      it 'returns the Writing system Key' do
        expect(config['writing_system_tesim'].to_s).to eq 'Writing system'
      end

      it 'returns the Opac url' do
        expect(config['opac_url_tesim'].to_s).to eq 'Opac url'
      end
    end
  end
end
