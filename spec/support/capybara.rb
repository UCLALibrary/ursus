# frozen_string_literal: true
# Setup chrome headless driver
Capybara.server = :puma, { Silent: true }

Capybara.register_driver :chrome_headless do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new

  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--window-size=1400,1400')

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.register_driver :mechanize do |app|
  driver = Capybara::Mechanize::Driver.new(app)
  driver.configure do |agent|
    # Configure other Mechanize options here.
    agent.log = Logger.new "mech.log"
    agent.user_agent_alias = 'Mac Safari'
  end
  driver
end

Capybara.javascript_driver = :chrome_headless

# Setup rspec
RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by :chrome_headless
  end

  config.before(:each, smoketest: true) do
    driven_by :mechanize
    Capybara.run_server = false
    # Uncomment this to see tests in browser
    Capybara.current_driver = :selenium
  end
end
