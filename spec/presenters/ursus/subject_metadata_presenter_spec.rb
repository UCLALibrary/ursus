# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::SubjectMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'subject_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do
      it 'returns the Subject Key' do
        expect(config['subject_tesim'].to_s).to eq('Subject')
      end

      it 'returns the Named Subject Key' do
        expect(config['named_subject_tesim'].to_s).to eq('Named Subject')
      end

      it 'returns the Keyword Key' do
        expect(config['keyword_tesim'].to_s).to eq('Keyword')
      end

      it 'returns the Based near Key' do
        expect(config['based_near_label_tesim'].to_s).to eq('Based Near')
      end

      it 'returns the Location Key' do
        expect(config['location_tesim'].to_s).to eq('Location')
      end

      it 'returns the Geographic Coordinates Key' do
        expect(config['geographic_coordinates_ssim'].to_s).to eq('Geographic Coordinates')
      end
    end
  end
end

# {'subject_tesim', 'named_subject_tesim', 'keyword_tesim', 'based_near_label_tesim', 'location_tesim', 'geographic_coordinates_ssim'}
