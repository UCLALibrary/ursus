# frozen_string_literal: true
require 'rails_helper'

RSpec.describe Ursus::TaglineMetadataPresenter do
  let(:solr_doc) do
    {
      'ark_ssi' => 'test',
      'title_tesim' => 'Test record',
      'repository_tesim' => 'Test Repository',
      'local_identifier_ssim' => '890_abc',
      'oclc_ssi' => 'abc123_oclc',
      'dlcs_collection_name_ssm' => 'Collection 1',
      'resource_type_tesim' => 'still image'
    }
  end

  let(:solr_doc_with_tagline) do
    {
      'ark_ssi' => 'test',
      'title_tesim' => 'Test record',
      'repository_tesim' => 'Test Repository',
      'local_identifier_ssim' => '890_abc',
      'oclc_ssi' => 'abc123_oclc',
      'dlcs_collection_name_ssm' => 'Collection 1',
      'resource_type_tesim' => 'still image',
      'tagline_ssi' => 'test tag line'
    }
  end
  let(:presenter_object) { described_class.new(document: solr_doc) }
  let(:presenter_object_with_tagline) { described_class.new(document: solr_doc_with_tagline) }
  let(:config) { YAML.safe_load(File.open(Rails.root.join('config', 'metadata/tagline_metadata.yml'))) }

  describe 'config' do
    it 'returns the Tagline Key' do
      expect(config['tagline_ssi'].to_s).to eq('Tagline')
    end
  end

  describe "#tagline_terms" do
    it "returns tagline" do
      expect(presenter_object_with_tagline.tagline_terms).to be_instance_of(Hash)
      expect(presenter_object_with_tagline.tagline_terms.keys.length).to eq 1
    end

    it "does not return tagline" do
      expect(presenter_object.tagline_terms.keys.length).to eq 0
    end
  end
end
