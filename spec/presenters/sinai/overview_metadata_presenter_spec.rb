# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::OverviewMetadataPresenter do
  let(:solr_doc) do
    {
      'date_created_tesim' => 'Date created',
      'foliation_tesim' => 'Foliation',
      'human_readable_language_tesim' => 'Language',
      'writing_system_tesim' => 'Writing system',
      'script_tesim' => 'Script',
      'repository_tesim' => 'Repository',
      'human_readable_rights_statement_tesim' => 'Rights statement',
      'services_contact_ssm' => 'Rights contact'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'date_created_tesim' => 'Date created',
      'foliation_tesim' => 'Foliation',
      'human_readable_language_tesim' => 'Language'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/overview_metadata.yml'))) }

  context 'with a solr document containing overview metadata' do
    describe '#terms' do

      it 'returns the Date created Key' do
        expect(config['date_created_tesim'].to_s).to eq('Date created')
      end

      it 'returns the Foliation Key' do
        expect(config['foliation_tesim'].to_s).to eq('Foliation')
      end

      it 'returns the Language Key' do
        expect(config['human_readable_language_tesim'].to_s).to eq('Language')
      end

      it 'returns the Writing system Key' do
        expect(config['writing_system_tesim'].to_s).to eq('Writing system')
      end

      it 'returns the Script Key' do
        expect(config['script_tesim'].to_s).to eq('Script')
      end

      it 'returns the Repository Key' do
        expect(config['repository_tesim'].to_s).to eq('Repository')
      end

      it 'returns the Rights statement Key' do
        expect(config['human_readable_rights_statement_tesim'].to_s).to eq('Rights statement')
      end

      it 'returns the Rights contact Key' do
        expect(config['services_contact_ssm'].to_s).to eq('Rights contact')
      end
    end

    describe "#overview_terms terms" do
      let(:all) { presenter_object.overview_terms.keys.length }
      let(:missing) { presenter_object_missing_items.overview_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 8
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
