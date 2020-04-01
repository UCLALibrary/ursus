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
end
