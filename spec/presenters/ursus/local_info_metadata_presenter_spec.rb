# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::LocalInfoMetadataPresenter do
  let(:solr_doc) do
    {
      'ark_ssi' => 'test',
      'title_tesim' => 'Test record',
      'repository_tesim' => 'Test Repository',
      'local_identifier_ssm' => '890_abc',
      'oclc_ssi' => 'abc123_oclc',
      'dlcs_collection_name_ssm' => 'Collection 1',
      'resource_type_tesim' => 'still image'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/local_info_metadata.yml'))) }

  context 'with a solr document containing local info metadata' do
    describe 'config' do
      it 'returns the Repository Key' do
        expect(config['repository_tesim'].to_s).to eq('Repository')
      end

      it 'returns the Local identifier Key' do
        expect(config['local_identifier_ssm'].to_s).to eq('Local identifier')
      end

      it 'returns the OCLC Number Key' do
        expect(config['oclc_ssi'].to_s).to eq('OCLC Number')
      end

      it 'returns the ARK Key' do
        expect(config['ark_ssi'].to_s).to eq('ARK')
      end
    end

    describe "#local_info_terms" do
      it "returns existing keys" do
        expect(presenter_object.local_info_terms).to be_instance_of(Hash)
        expect(presenter_object.local_info_terms.keys.length).to eq 4
        expect(presenter_object.local_info_terms.include?('ark_ssi')).to be true
      end
    end
  end
end
