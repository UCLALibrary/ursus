# frozen_string_literal: true
# gem 'rspec-collection_matchers'

require 'rails_helper'

RSpec.describe StaticController, type: :controller do
  describe 'the static pages are successfully served' do
    context 'GET #ursus_copyright' do
      it "returns http success" do
        get :ursus_copyright
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:ursus_copyright)
      end
    end
    context 'GET #ursus_privacy' do
      it "returns http success" do
        get :ursus_privacy
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:ursus_privacy)
      end
    end
    context 'GET #contact' do
      it "returns http success" do
        get :contact
        expect(response).to have_http_status(:success)
        expect(response).to render_template(:contact)
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
