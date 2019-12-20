require "rails_helper"

RSpec.describe LoginsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(:get => "/logins").to route_to("logins#index")
    end

    it "routes to #new" do
      expect(:get => "/logins/new").to route_to("logins#new")
    end

    it "routes to #show" do
      expect(:get => "/logins/1").to route_to("logins#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/logins/1/edit").to route_to("logins#edit", :id => "1")
    end


    it "routes to #create" do
      expect(:post => "/logins").to route_to("logins#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/logins/1").to route_to("logins#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/logins/1").to route_to("logins#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/logins/1").to route_to("logins#destroy", :id => "1")
    end
  end
end
