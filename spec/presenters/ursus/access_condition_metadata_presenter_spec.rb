# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::AccessConditionMetadataPresenter do
  let(:id) { '123' }
  let(:pres) { described_class.new(document: doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/access_condition_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#access_condition_terms' do
      it 'returns the Rights statement Key' do
        expect(config['human_readable_rights_statement_tesim'].to_s).to eq('Rights statement')
      end

      it 'returns the Rights (country of creation) Key' do
        expect(config['rights_country_tesim'].to_s).to eq('Rights (country of creation)')
      end

      it 'returns the Rights Holder Key' do
        expect(config['rights_holder_tesim'].to_s).to eq('Rights Holder')
      end

      it 'returns the Rights Contact Key' do
        expect(config['services_contact_ssm'].to_s).to eq('Rights Contact')
      end

      it 'returns the License Key' do
        expect(config['license_tesim'].to_s).to eq('License')
      end

      it 'returns the Funding Note Key' do
        expect(config['funding_note_tesim'].to_s).to eq('Funding Note')
      end

      it 'returns the Local Rights Statement key' do
        expect(config['local_rights_statement_ssim'].to_s).to eq('Local Rights statement')
      end
    end
  end
end
