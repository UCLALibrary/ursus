# frozen_string_literal: true
require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  let(:controller) { described_class.new }

  describe '#display_banner?' do
    context 'when banner cookie is set' do
      before do
        allow(controller).to receive(:banner_cookie?).and_return(true)
      end

      it 'sets @beta_banner_display_option to \'none\'' do
        controller.display_banner?
        expect(controller.instance_variable_get('@beta_banner_display_option')).to eq 'none'
      end
    end

    context 'when banner cookie is not set' do
      before do
        allow(controller).to receive(:banner_cookie?).and_return(false)
        allow(controller).to receive(:set_banner_cookie)
      end

      it 'sets @beta_banner_display_option to \'block\'' do
        controller.display_banner?
        expect(controller.instance_variable_get('@beta_banner_display_option')).to eq 'block'
      end

      it 'sets the banner cookie' do
        controller.display_banner?
        expect(controller).to have_received(:set_banner_cookie)
      end
    end
  end

  describe '#solr_document_path' do
    context 'when called without an argument' do
      it 'uses the URL parameter `id`, assuming it\'s an ARK' do
        allow(controller).to receive(:params).and_return(id: 'ark:/123/abc')
        expect(controller.solr_document_path).to eq '/catalog/ark:/123/abc'
      end

      context 'when it can\'t find the URL parameter `id`' do
        it 'points to the index page' do
          allow(controller).to receive(:params).and_return({})
          expect(controller.solr_document_path).to eq '/catalog/'
        end
      end
    end
  end
end
