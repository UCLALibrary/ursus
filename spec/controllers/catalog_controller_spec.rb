# frozen_string_literal: true
require 'rails_helper'

RSpec.describe CatalogController, type: :controller do
  # describe 'facets' do
  #   let(:facets) do
  #     controller
  #       .blacklight_config
  #       .facet_fields.keys
  #       .map { |field| field.gsub(/\_s+im$/, '') }
  #   end
  #
  #   let(:expected_facets) do
  #     ['human_readable_type',
  #      'resource_type',
  #      'creator',
  #      'contributor',
  #      'degree',
  #      'institution',
  #      'school',
  #      'department',
  #      'keyword',
  #      'subject',
  #      'language',
  #      'license',
  #      'based_near_label',
  #      'file_format',
  #      'member_of_collections',
  #      'generic_type',
  #      'rights_statement']
  #   end
  #
  #   it 'has exactly expected facets' do
  #     expect(facets).to contain_exactly(*expected_facets)
  #   end
  # end

  describe 'index fields' do
    let(:index_fields) do
      controller
        .blacklight_config
        .index_fields.keys
        .map { |field| field.gsub(/\_s+im$/, '') }
    end

    let(:expected_index_fields) do
      ['description_tesim',
       'date_created_tesim',
       'resource_type_tesim',
       'photographer_tesim']
    end
    it { expect(index_fields).to contain_exactly(*expected_index_fields) }
  end

  describe 'search fields' do
    let(:search_fields) { controller.blacklight_config.search_fields.keys }

    let(:expected_search_fields) do
      ['all_fields']
    end

    it { expect(search_fields).to contain_exactly(*expected_search_fields) }
  end
end
