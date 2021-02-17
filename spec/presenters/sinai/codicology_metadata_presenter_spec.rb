# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Sinai::CodicologyMetadataPresenter do
  let(:solr_doc) do
    {
      'extent_tesim' => 'Extent',
      'collation_tesim' => 'Collation',
      'form_sim' => 'Form',
      'support_tesim' => 'Support',
      'writing_system_tesim' => 'Writing system',
      'script_tesim' => 'Script',
      'page_layout_ssim' => 'Page layout',
      'foliation_tesim' => 'Foliation note',
      'hand_note_tesim' => 'Hand note',
      'binding_note_tesim' => 'Binding note',
      'condition_note_tesim' => 'Condition note',
      'description_tesim' => 'Physical Description note'
    }
  end
  let(:solr_doc_missing_items) do
    {
      'extent_tesim' => 'Extent',
      'collation_tesim' => 'Collation',
      'form_sim' => 'Form',
      'support_tesim' => 'Support',
      'writing_system_tesim' => 'Writing system',
      'script_tesim' => 'Script'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_missing_items) { described_class.new(document: solr_doc_missing_items) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata-sinai/codicology_metadata.yml'))) }

  context 'with a solr document containing codicology metadata' do
    describe '#terms' do
      it 'returns the Title Key' do
        expect(config['extent_tesim'].to_s).to eq('Extent')
      end
      
      it 'returns the Title Key' do
        expect(config['collation_tesim'].to_s).to eq('Collation')
      end
      
      it 'returns the Title Key' do
        expect(config['form_sim'].to_s).to eq('Form')
      end
      
      it 'returns the Title Key' do
        expect(config['support_tesim'].to_s).to eq('Support')
      end
      
      it 'returns the Title Key' do
        expect(config['writing_system_tesim'].to_s).to eq('Writing system')
      end
      
      it 'returns the Title Key' do
        expect(config['script_tesim'].to_s).to eq('Script')
      end
      
      it 'returns the Title Key' do
        expect(config['page_layout_ssim'].to_s).to eq('Page layout')
      end
      
      it 'returns the Title Key' do
        expect(config['foliation_tesim'].to_s).to eq('Foliation note')
      end
      
      it 'returns the Title Key' do
        expect(config['hand_note_tesim'].to_s).to eq('Hand note')
      end
      
      it 'returns the Title Key' do
        expect(config['binding_note_tesim'].to_s).to eq('Binding note')
      end
      
      it 'returns the Title Key' do
        expect(config['condition_note_tesim'].to_s).to eq('Condition note')
      end
      
      it 'returns the Title Key' do
        expect(config['description_tesim'].to_s).to eq('Physical Description note')
      end
    end
  
    describe "#codicology_terms terms" do
      let(:all) { presenter_object.codicology_terms.keys.length }
      let(:missing) { presenter_object_missing_items.codicology_terms.keys.length }

      it "returns existing keys" do
        expect(all).to eq 12
        expect(config.length).to eq all
      end

      it "is missing elements" do
        expect(all - missing).to_not eq 0
        expect(config.length - missing).to_not eq 0
      end
    end
  end
end
