# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'viewing the home page', :clean, type: :system, js: false do
  it 'has a 200 status code' do
    visit('/')
    expect page.status_code == 200
  end

  it 'has h1' do
    visit('/')
    expect(page).to have_content 'UCLA Library Digital Collections'
  end

  it 'has an About link' do
    visit('/')
    expect(page).to have_link 'About'
  end

  it 'has an feedback link' do
    visit('/')
    expect(page).to have_link 'Give us feedback'
  end

  it 'has a copyright & collections link' do
    visit('/')
    expect(page).to have_link 'Copyright and Collections'
  end

  it 'has a privacy policy link' do
    visit('/')
    expect(page).to have_link 'Collections'
  end

  it 'has a contact link' do
    visit('/')
    expect(page).to have_link 'Contact'
  end

  it 'doesn\'t have Google Analytics when it shouldn\'t' do
    visit('/')
    expect(page).not_to have_selector 'script#analytics-script'
    expect(page).not_to have_selector 'noscript#analytics-noscript'
  end

  it 'has Google Analytics when it should' do
    ENV['GOOGLE_TAG_MGR_ID'] = '123456789'
    visit('/')
    expect(page).to have_selector '#analytics-script'
    expect(page).to have_selector '#analytics-noscript'
    ENV.delete('GOOGLE_TAG_MGR_ID')
  end
end
