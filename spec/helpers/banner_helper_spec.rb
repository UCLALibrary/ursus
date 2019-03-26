# frozen_string_literal: true

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

  describe '#render_banner_tag' do
    it 'returns an img tag for the banner' do
      doc['id'] = '1'
      doc['has_model_ssim'] = ['Collection']
      stubbed_request
      local_stubbed_request
      expect(render_banner_tag(doc)).to be_in(["<div class='collection-banner' alt='Collection banner' style='background-image:url(http://localhost:3000/branding/3049304/banner/test.tif);'></div>",
                                               "<div class='collection-banner' alt='Collection banner' style='background-image:url(http://californica-test.library.ucla.edu/branding/3049304/banner/test.tif);'></div>"]) # rubocop:disable Metrics/LineLength
    end
  end

  describe '#get_img_path' do
    it 'returns the url to the image' do
      stubbed_request
      local_stubbed_request
      expect(get_img_path('1')).to be_in(['http://californica-test.library.ucla.edu/branding/3049304/banner/test.tif',
                                          'http://localhost:3000/branding/3049304/banner/test.tif'])
    end
  end

  describe '#get_branding_info' do
    it 'returns an array with the path to the branding info' do
      stubbed_request
      local_stubbed_request
      expect(get_branding_info('1')).to eq(['/opt/path',
                                            'branding/3049304/banner/test.tif'])
    end
  end
end
