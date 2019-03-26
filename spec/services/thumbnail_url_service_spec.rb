# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ThumbnailUrlService do
  let(:html) { '<a href="test"><img src="/something" /></a>' }
  let(:tn_url_service) { described_class.new(url: 'http://example.com/', html: html) }

  it 'can append a string to the src attribute' do
    expect(tn_url_service.markup_with_full_url).to match(/http:\/\/example.com/)
  end
end
