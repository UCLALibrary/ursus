# frozen_string_literal: true
# https://github.com/UCLALibrary/ursus/blob/master/spec/helpers/banner_helper_spec.rb

require 'rails_helper'

RSpec.describe BannerHelper, type: :helper do
  let(:doc) { {} }
  let(:bod) { { local_path: '/opt/path/public/branding/3049304/banner/test.tif' }.to_json }
  let(:stubbed_request) do
    stub_request(:get, 'http://californica-test.library.ucla.edu/branding_info/1.json')
      .with(
        headers: {
          'Accept' => '*/*',
          'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
          'User-Agent' => 'Ruby'
        }
      ).to_return(status: 200, body: bod,
                  headers: { 'Content-Type' => 'application/json' })
  end
  let(:local_stubbed_request) do
    stub_request(:get, 'http://localhost:3000/branding_info/1.json')
      .with(
        headers: {
          'Accept' => '*/*',
          'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
          'User-Agent' => 'Ruby'
        }
      ).to_return(status: 200, body: bod,
                  headers: { 'Content-Type' => 'application/json' })
  end

  before do
    WebMock.disable_net_connect!
  end

  after do
    WebMock.allow_net_connect!
  end

  describe '#collection?' do
    it 'can determine if something is a collection' do
      doc['has_model_ssim'] = ['Collection']
      expect(collection?(doc)).to eq(true)
    end

    it 'can determine if something is not a collection' do
      doc['has_model_ssim'] = ['Work']
      expect(collection?(doc)).to eq(false)
    end
  end
end
