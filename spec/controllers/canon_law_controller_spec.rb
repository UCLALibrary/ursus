# frozen_string_literal: true
# gem 'rspec-collection_matchers'

require 'rails_helper'

RSpec.describe CanonLawController, type: :controller do
  describe "GET #canonlaw" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
end
