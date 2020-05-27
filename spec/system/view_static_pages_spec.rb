# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'view static pages', :clean, type: :system, js: false do
  context 'view Copyrights and Collections' do
    it 'has the right header' do
      visit('/copyrights_and_collections')
      expect(page).to have_content 'Copyrights and Collections'
    end
  end

  context 'view Contact page' do
    it 'has the right header' do
      visit('/contact')
      expect(page).to have_content 'Contact'
    end
  end
end
