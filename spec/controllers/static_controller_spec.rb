# frozen_string_literal: true
#   gem 'rspec-collection_matchers'

require 'rails_helper'

RSpec.describe StaticController, type: :controller do
  describe 'the static pages are successfully served' do
    context 'GET #about' do
      it "returns http success" do
        get :about
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:about)
      end
    end
    context 'GET #copyright' do
      it "returns http success" do
        get :copyright
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:copyright)
      end
    end
    context 'GET #privacy' do
      it "returns http success" do
        get :privacy
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:privacy)
      end
    end
    context 'GET #contact' do
      it "returns http success" do
        get :contact
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:contact)
      end
    end
    context 'GET #migration_updates' do
      it "returns http success" do
        get :migration_updates
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:migration_updates)
      end
    end
    context 'GET #version' do
      it "returns http success" do
        get :version
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:version)
      end
    end
  end
end
