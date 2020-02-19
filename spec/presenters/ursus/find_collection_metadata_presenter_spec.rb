# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::FindCollectionMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/find_collection_metadata.yml'))) }

  context 'with a solr document containing Find Collection info metadata' do
    describe '#find_collection_terms' do
      it 'returns the Repository Key' do
        expect(config['repository_tesim'].to_s).to eq('Repository')
      end

      it 'returns the Find Collection identifier Key' do
        expect(config['local_identifier_ssm'].to_s).to eq('Local identifier')
      end

      it 'returns the ARK Key' do
        expect(config['ark_ssi'].to_s).to eq('ARK')
      end
    end
  end
end
