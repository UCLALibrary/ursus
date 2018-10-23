# frozen_string_literal: true
require 'rails_helper'

RSpec.describe DisplayHelper do
  describe '#values_with_line_breaks' do
    subject(:transformed_value) { helper.values_with_line_breaks({ value: value }) }

    context 'with an array of values' do
      let(:value) { ['history', 'art', 'science'] }

      it 'puts a line break between each value' do
        expect(transformed_value).to eq 'history<br />art<br />science'
      end
    end

    context 'with a string value' do
      let(:value) { 'a single string' }

      it 'just returns the input string' do
        expect(transformed_value).to eq 'a single string'
      end
    end
  end
end
