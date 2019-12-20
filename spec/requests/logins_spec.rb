require 'rails_helper'

RSpec.describe "Logins", type: :request do
  describe "GET /logins" do
    it "works! (now write some real specs)" do
      get logins_path
      expect(response).to have_http_status(200)
    end
  end
end
