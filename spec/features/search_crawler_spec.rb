# frozen_string_literal: true
require 'rails_helper'

RSpec.describe "Search History Page" do
  describe "crawler search" do
    it "does remember human searches" do
      visit root_path
      fill_in "q", with: 'cat'
      expect { click_button 'Search' }.to change { Search.count == 1 }
    end

    it "does not remember bot searches" do
      page.driver.header('User-Agent', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
      visit root_path
      fill_in "q", with: 'cat'
      expect { click_button 'Search' }.not_to change { Search.count }
    end
  end
end
