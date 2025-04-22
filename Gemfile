# frozen_string_literal: true
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'blacklight', '7.40'
gem 'blacklight-access_controls', '>= 6.0.0'
gem 'blacklight-gallery', '~> 3.5.0'
gem 'blacklight_dynamic_sitemap', '~> 0.6.0'
gem 'blacklight_oai_provider', github: 'projectblacklight/blacklight_oai_provider'
gem 'blacklight_range_limit', '~> 7.0.0'
gem 'bootstrap', '~> 4.4', '>= 4.4.1'
gem 'coveralls', '>= 0.8.23', require: false
gem 'date', '3.0.3' # pin to version on RHEL 8 servers
gem 'devise', '>= 4.7.1'
gem 'devise-guests', '~> 0.7', '>= 0.7.0'
gem 'dotenv-rails', '>= 2.7.5'
gem 'flipflop'
gem 'font-awesome-rails', '~> 4.7', '>= 4.7.0.5'
gem 'httparty'
gem 'jquery-rails', '~> 4.4', '>= 4.4.0'
gem 'loofah', '>= 2.4.0'
gem 'mysql2', '~> 0.5'
gem 'pkg-config', '~> 1.1'
gem 'puma', '~> 5.5' # app server
gem 'rails', '~> 6.1'
gem 'rails_autolink'
gem 'rollbar' # Error reporting tool
gem 'rsolr', '>= 1.0'
gem 'sassc-rails', '>= 2.1.2' # SASS -> CSS compiler
gem 'sidekiq', '~> 6.4'
gem 'solrizer', '>= 4.1.0'
gem 'sprockets', '>= 3.7.2', '< 4'
gem 'timeout', '0.1.0' # pin to version on RHEL 8 servers
gem 'turbolinks', '~> 5' # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'uglifier', '>= 1.3.0' # JavaScript compressor
gem 'whenever', require: false

group :development, :test do
  gem 'byebug' # debugger
  gem 'capybara', '~> 3.26' # Adds support for Capybara system testing and selenium driver
  gem 'capybara-mechanize', '>= 1.11.0'
  gem 'equivalent-xml', '>= 0.6.0'
  gem 'factory_bot_rails', '>= 5.1.1'
  gem 'rails-controller-testing', '>= 1.0.4'
  gem 'rspec-collection_matchers'
  gem 'rspec-its'
  gem 'rspec-rails', '~> 5.0'
  gem 'selenium-webdriver', '>= 3.142.3'
  gem 'webmock'
end

group :development do
  gem 'capistrano', '3.11.0'
  gem 'capistrano-bundler', '~> 1.3'
  gem 'capistrano-ext'
  gem 'capistrano-passenger'
  gem 'capistrano-rails'
  gem 'capistrano-sidekiq', '~> 2.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.7.0' # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'xray-rails', '>= 0.3.2'
end
