# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::ProvenanceMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'provenance_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Date Created Key' do
        expect(config['date_created_tesim'].to_s).to eq('Date Created')
      end

      it 'returns the Language Key' do
        expect(config['language_tesim'].to_s).to eq('Language')
      end

      it 'returns the Publisher Key' do
        expect(config['publisher_tesim'].to_s).to eq('Publisher')
      end

      it 'returns the Collection Key' do
        expect(config['member_of_collections_ssim'].to_s).to eq('Collection')
      end

      it 'returns the caption' do
        expect(config['dlcs_collection_name_tesim'].to_s).to eq('Collection')
      end

      it 'returns the Date Uploaded Key' do
        expect(config['date_uploaded_tesim'].to_s).to eq('Date Uploaded')
      end

      it 'returns the Date Modified Key' do
        expect(config['date_modified_tesim'].to_s).to eq('Date Modified')
      end
    end
  end
end

# {'date_created_tesim', 'language_tesim', 'publisher_tesim', 'member_of_collections_ssim', 'dlcs_collection_name_tesim', 'date_uploaded_tesim', 'date_modified_tesim'}
