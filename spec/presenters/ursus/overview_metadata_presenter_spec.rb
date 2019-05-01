# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::OverviewMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'overview_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Title Key' do
        expect(config['title_tesim'].to_s).to eq('Title')
      end

      it 'returns the Description Key' do
        expect(config['description_tesim'].to_s).to eq('Description')
      end

      it 'returns the Creator Key' do
        expect(config['creator_tesim'].to_s).to eq('Creator')
      end

      it 'returns the Contributor Key' do
        expect(config['contributor_tesim'].to_s).to eq('Contributor')
      end

      it 'returns the Photographer Key' do
        expect(config['photographer_tesim'].to_s).to eq('Photographer')
      end

      it 'returns the Caption Key' do
        expect(config['caption_tesim'].to_s).to eq('Caption')
      end
    end
  end
end

# {'title_tesim'=>'Title', 'description_tesim'=>'Description', 'creator_tesim'=>'Creator', 'contributor_tesim'=>'Contributor', 'photographer_tesim'=>'Photographer', 'caption_tesim'=>'Caption'}
