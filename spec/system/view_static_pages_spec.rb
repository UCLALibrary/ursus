# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'view static pages', :clean, type: :system, js: false do
  context 'view Copyrights and Collections' do
    it 'has the right header' do
      visit('/copyrights_and_collections')
      expect(page).to have_content 'Copyrights and Collections'
    end
  end

  context 'view About page' do
    it 'has the right header' do
      visit('/about')
      expect(page).to have_content 'About Us'
    end
  end

  context 'view Contact page' do
    it 'has the right header' do
      visit('/contact')
      expect(page).to have_content 'Contact'
    end
  end

  context 'view Migration Updates page' do
    it 'has the right header' do
      visit('/migration_updates')
      expect(page).to have_content 'Migration Updates'
    end
  end
end
