# frozen_string_literal: true
require 'rails_helper'

Blacklight::ThumbnailPresenter.send(:prepend, Ursus::ThumbnailPresenter)

class MockViewContext
  def image_tag(_document, _image_options)
    '<i />'
  end

  def link_to_document(_document, value, _url_options)
    "<a>#{value}</a>"
  end
end

# NOTE: Ursus::ThumbnailPresenter gets injected into Blacklight::ThumbnailPresenter via config/initializers/prepends.rb, so these tests are written against Blacklight::ThumbnailPresenter but they test
# the behavior defined in Ursus::ThumbnailPresenter
RSpec.describe Blacklight::ThumbnailPresenter do
  let(:presenter) { described_class.new(solr_document, view_context, view_config) }
  let(:solr_document) { SolrDocument.new('thumbnail_url_ss' => thumbnail_url, 'title_tesim' => [title], 'visibility_ssi' => visibility) }
  let(:thumbnail_url) { 'http://test.url/thumbnail.jpg' }
  let(:title) { 'test title lkjhqbnet' }
  let(:view_config) { double('Blacklight::Configuration::ViewConfig', thumbnail_method: nil, thumbnail_field: 'thumbnail_url_ss') } # rubocop:disable RSpec/VerifiedDoubles
  let(:view_context) { MockViewContext.new }
  let(:visibility) { 'open' }

  before do
    allow(view_context).to receive(:image_tag).and_call_original
    allow(view_context).to receive(:link_to_document).and_call_original
  end

  describe '#thumbnail_tag' do
    let(:image_options) { {} }
    let(:url_options) { {} }
    let(:result) { presenter.thumbnail_tag(image_options, url_options) }

    it 'creates the thumbnail HTML' do
      expect(result).to eq '<a><i /></a>'
    end

    context 'when the document has \'discovery\' visibility' do
      let(:visibility) { 'discovery' }

      it 'shows the thumbnail in Sinai mode' do
        allow(Flipflop).to receive(:sinai?).and_return(true)
        expect(result).to eq '<a><i /></a>'
      end

      it 'hides the thumbnail when not in Sinai mode' do
        allow(Flipflop).to receive(:sinai?).and_return(false)
        expect(result).to eq nil
      end
    end

    it 'sets <img> alt text to (first) title' do
      result
      expect(view_context).to have_received(:image_tag).with(solr_document['thumbnail_url_ss'], alt: 'test title lkjhqbnet')
    end

    context 'when given extra options' do
      let(:image_options) { { data_test: 'image option' } }
      let(:url_options) { { data_test: 'url option' } }

      it 'adds image_options to the <img> tag' do
        result
        expect(view_context).to have_received(:image_tag).with(solr_document['thumbnail_url_ss'], alt: 'test title lkjhqbnet', data_test: 'image option')
      end

      it 'adds url_options to the <a> tag' do
        result
        expect(view_context).to have_received(:link_to_document).with(solr_document, '<i />', data_test: 'url option')
      end
    end
  end

  describe '#thumbnail_value_from_document' do
    it 'uses thumbnail_url_ss' do
      expect(presenter.thumbnail_value_from_document(solr_document)).to eq thumbnail_url
    end
  end
end
