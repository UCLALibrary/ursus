# frozen_string_literal: true
require 'rails_helper'
require 'support/solr_doc_double'

include SolrDocDouble

RSpec.describe Ursus::ContactCollectionMetadataPresenter do
  let(:solr_doc) do
    doc_double_with_fields_to_render('services_contact_ssm' => 'Rights Contact')
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/contact_collection_metadata.yml'))) }

  context 'with a solr document containing Find Collection info metadata' do
    describe 'config' do
      it 'returns the Rights Contact Key' do
        expect(config['services_contact_ssm'].to_s).to eq('Rights Contact')
      end
    end

    describe "#contact_collection_terms" do
      let(:all) { presenter_object.contact_collection_terms.keys.length }
      let(:missing) { presenter_object_missing_items.contact_collection_terms.keys.length }

      it "returns existing keys" do
        expect(presenter_object.contact_collection_terms).to be_instance_of(Hash)
        expect(all).to eq 1
        expect(config.length).to eq all
      end
    end
  end
end
