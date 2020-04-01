# frozen_string_literal: true
require 'rails_helper'
ENV['RAILS_HOST'] ||= 'ursus-test'

RSpec.describe SinaiToken, type: :model do
  context "returns a sinai_token" do
    it "creates a random string and stores it in the database as the sinai_token" do
      random_string = SecureRandom.uuid
      new_token = SinaiToken.create!(sinai_token: random_string)
      # SinaiToken id: 3, sinai_token: "639ca691-8bc5-4ccb-ae96-9f9335376747", created_at: "2020-04-01 18:30:32", updated_at: "2020-04-01 18:30:32">
      expect(new_token.reload.sinai_token).to eq(random_string)
    end

    it "has one token after adding one" do
      instance_double("SinaiToken", sinai_token: "Random-36-Charater-String")
    end
  end
end

# instance_double https://relishapp.com/rspec/rspec-mocks/v/3-2/docs/verifying-doubles/using-an-instance-double
