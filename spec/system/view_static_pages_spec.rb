# frozen_string_literal: true
require 'rails_helper'

RSpec.describe 'view static pages', :clean, type: :system, js: false do
  # Ursus
  context 'view Ursus About page' do
    it 'has the right header' do
      visit('/ursus_about')
      expect(page).to have_content 'About'
    end
  end

  context 'view Copyrights and Collections' do
    it 'has the right header' do
      visit('/copyrights_and_collections')
      expect(page).to have_content 'Copyrights and Collections'
    end
  end

  context 'view Privacy Policy page' do
    it 'has the right header' do
      visit('/privacy_policy')
      expect(page).to have_content 'Privacy Policy'
    end
  end

  context 'view Ursus Contact page' do
    it 'has the right header' do
      visit('/ursus_contact')
      expect(page).to have_content 'Contact'
    end
  end
end
