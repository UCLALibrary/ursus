# frozen_string_literal: true
# https://jira.library.ucla.edu/browse/URS-651

require 'rails_helper'
ENV['RAILS_HOST'] ||= 'ursus-test'

RSpec.describe SolrDocument do
  let(:solr_document) do
    described_class.new(id: 'abc123',
                        title_tesim: ['Test record'],
                        dlcs_collection_name_ssm: ['Collection 1'],
                        resource_type_tesim: ['still image'])
  end

  it 'formats a citation' do
    expect(solr_document.export_as_ucla_citation_txt).to eq("Test record. [still image]. UCLA Library Digital Collections. Collection 1. https://#{ENV['RAILS_HOST']}/catalog/abc123")
  end

  context 'when fields are missing' do
    let(:solr_document) do
      described_class.new(id: 'abc123',
                          title_tesim: [],
                          dlcs_collection_name_ssm: [],
                          resource_type_tesim: [])
    end

    it 'uses placeholder values' do
      expect(solr_document.export_as_ucla_citation_txt).to eq("Untitled. [unknown type]. UCLA Library Digital Collections. No collection. https://#{ENV['RAILS_HOST']}/catalog/abc123")
    end
  end

  describe '#find' do
    let(:arguments) do
      {
        id: hyrax_id,
        ark_ssi: ark
      }
    end
    let(:ark) { 'ark:/123/abc' }
    let(:repository) { instance_double('Blacklight::Solr::Repository') }
    let(:hyrax_id) { 'cba-321' }
    let(:solr_document) { described_class.new(arguments) }

    before do
      allow(repository).to receive(:find).with(hyrax_id).and_return(instance_double('Blacklight::Solr::Response', documents: [solr_document]))
      allow(Blacklight).to receive(:default_index).and_return(repository)
    end

    it 'calls parent class\'s `#find`' do
      expect(described_class.find(hyrax_id)).to eq solr_document
    end

    context 'when the document has no ARK' do
      let(:ark) { nil }

      it 'raises an exception' do
        expect { described_class.find(hyrax_id) } .to raise_error Blacklight::Exceptions::RecordNotFound
      end
    end
  end
end
