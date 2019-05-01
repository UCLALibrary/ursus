# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::MaterialsMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'materials_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Resource Type Key' do
        expect(config['resource_type_tesim'].to_s).to eq('Resource Type')
      end

      it 'returns the Format Key' do
        expect(config['format_tesim'].to_s).to eq('Format')
      end

      it 'returns the Medium Key' do
        expect(config['medium_tesim'].to_s).to eq('Medium')
      end

      it 'returns the Genre Key' do
        expect(config['genre_tesim'].to_s).to eq('Genre')
      end

      it 'returns the Extent Key' do
        expect(config['extent_tesim'].to_s).to eq('Extent')
      end

      it 'returns the Dimensions Key' do
        expect(config['dimensions_tesim'].to_s).to eq('Dimensions')
      end
    end
  end
end

# {'resource_type_tesim', 'format_tesim', 'medium_tesim', 'genre_tesim', 'extent_tesim', 'dimensions_tesim'}
