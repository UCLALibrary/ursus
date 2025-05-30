# frozen_string_literal: true
require 'rails_helper'
require 'support/solr_doc_double'

include SolrDocDouble

RSpec.describe Ursus::AccessConditionMetadataPresenter do
  let(:solr_doc) do
    doc_double_with_fields_to_render(
      'human_readable_rights_statement_tesim' => 'Rights statement',
      'local_rights_statement_ssm' => 'Local Rights statement',
      'services_contact_ssm' => 'Rights Contact',
      'rights_holder_tesim' => 'Rights Holder',
      'rights_country_tesim' => 'Rights (country of creation)',
      'funding_note_tesim' => 'Funding Note'
    )
  end
  let(:solr_doc_missing_items) do
    doc_double_with_fields_to_render(
      'human_readable_rights_statement_tesim' => 'Rights statement',
      'local_rights_statement_ssm' => 'Local Rights statement',
      'services_contact_ssm' => 'Rights Contact'
    )
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/access_condition_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe 'config' do
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

      it 'returns the Funding Note Key' do
        expect(config['funding_note_tesim'].to_s).to eq('Funding Note')
      end

      it 'returns the Local Rights Statement key' do
        expect(config['local_rights_statement_ssm'].to_s).to eq('Local Rights statement')
      end
    end

    describe "#access_condition terms" do
      let(:all) { presenter_object.access_condition_terms.keys.length }
      let(:missing) { presenter_object_missing_items.access_condition_terms.keys.length }

      it "returns existing keys" do
        expect(presenter_object.access_condition_terms).to be_instance_of(Hash)
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
