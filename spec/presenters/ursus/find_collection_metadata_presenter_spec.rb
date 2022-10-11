# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::FindCollectionMetadataPresenter do
  let(:solr_doc) do
    {
      'repository_tesim' => 'Repository',
      'local_identifier_ssm' => 'Local identifier',
      'oclc_ssi' => 'OCLC Number',
      'ark_ssi' => 'ARK',
      'opac_url_ssi' => 'Opac url',
      'program_tesim' => 'Program'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'repository_tesim' => 'Repository',
      'local_identifier_ssm' => 'Local identifier',
      'oclc_ssi' => 'OCLC Number'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/find_collection_metadata.yml'))) }

  context 'with a solr document containing Find Collection info metadata' do
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

      it 'returns the Opac url Key' do
        expect(config['opac_url_ssi'].to_s).to eq('Opac url')
      end

      it 'returns the ProgramKey' do
        expect(config['program_tesim'].to_s).to eq('Program')
      end
    end

    describe "#find_collection_terms" do
      let(:all) { presenter_object.find_collection_terms.keys.length }
      let(:missing) { presenter_object_missing_items.find_collection_terms.keys.length }

      it "returns existing keys" do
        expect(presenter_object.find_collection_terms).to be_instance_of(Hash)
        expect(all).to eq 6
        expect(config.length).to eq all
      end

      it "is missing some elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
