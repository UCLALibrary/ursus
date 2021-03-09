# frozen_string_literal: true
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'blacklight-gallery', '~> 1.7.0'
gem 'blacklight_oai_provider', github: 'projectblacklight/blacklight_oai_provider'
gem 'dotenv-rails', '>= 2.7.5'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2'
# Use Puma as the app server
gem 'puma', '~> 5.2'
# Use SCSS for stylesheets
gem 'sassc-rails', '>= 2.1.2'
# Use Uglifier as compressor for JavaScript assets
gem 'mysql2', '~> 0.5'
gem 'pkg-config', '~> 1.1'
gem 'sidekiq', '~> 5.2.7'
gem 'sprockets', '>= 3.7.2', '< 4'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Error reporting tool
gem 'rollbar'

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  gem 'bixby', '~> 1.0'
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.18', '>= 2.18.0'
  gem 'capybara-mechanize', '>= 1.11.0'
  gem 'equivalent-xml', '>= 0.6.0'
  gem 'erb_lint', '>= 0.0.30', require: false
  gem 'factory_bot_rails', '>= 5.1.1'
  gem 'rails-controller-testing', '>= 1.0.4'
  gem 'rspec-collection_matchers'
  gem 'rspec-its'
  gem 'rspec-rails', '~> 3.9', '>= 3.9.0'
  gem 'rubocop'
  gem 'selenium-webdriver', '>= 3.142.3'
  gem 'solr_wrapper', '>= 2.1.0'
  gem 'webmock'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.7.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'capistrano', '~> 3.11.0'
  gem 'capistrano-bundler', '~> 1.3'
  gem 'capistrano-ext'
  gem 'capistrano-passenger'
  gem 'capistrano-rails'
  gem 'capistrano-sidekiq', '~> 0.20.0'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'xray-rails', '>= 0.3.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'blacklight', '~> 7.3.0'
gem 'blacklight-access_controls', '>= 6.0.0'
gem 'blacklight_dynamic_sitemap', '~> 0.1.0'
gem 'blacklight_range_limit', '~> 7.0.0'
gem 'bootstrap', '~> 4.4', '>= 4.4.1'
gem 'coveralls', '>= 0.8.23', require: false
gem 'devise', '>= 4.7.1'
gem 'devise-guests', '~> 0.7', '>= 0.7.0'
gem 'flipflop'
gem 'font-awesome-rails', '~> 4.7', '>= 4.7.0.5'
gem 'httparty'
gem 'jquery-rails', '~> 4.4', '>= 4.4.0'
gem 'loofah', '>= 2.4.0'
gem 'rsolr', '>= 1.0'
gem 'solrizer', '>= 4.1.0'
gem 'whenever', require: false
