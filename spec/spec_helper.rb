# frozen_string_literal: true

# This file is copied to spec/ when you run 'rails generate rspec:install'
# Has been customized by Blacklight to work when application is in one place,
# and actual spec/ stuff is in another (the blacklight gem checkout).

ENV['RAILS_ENV'] ||= 'test'

require 'rsolr'
require 'blacklight'
require 'rspec/its'
require 'rspec/collection_matchers'
require 'capybara/rspec'
require 'selenium-webdriver'
require 'equivalent-xml'

if ENV['TRAVIS'] == 'true'
  require 'coveralls'
  Coveralls.wear!('rails')
end

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
# Blacklight, again, make sure we're looking in the right place for em.
# Relative to HERE, NOT to Rails.root, which is off somewhere else.
Dir[Pathname.new(File.expand_path('support/**/*.rb', __dir__))].each { |f| require f }

RSpec.configure do |config|
  config.disable_monkey_patching!

  # When we're testing the API, only run the api tests
  config.filter_run api: true if ENV['BLACKLIGHT_API_TEST']

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  # config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  # config.use_transactional_fixtures = true

  # config.infer_spec_type_from_file_location!

  config.include(ControllerLevelHelpers, type: :helper)
  config.before(:each, type: :helper) { initialize_controller_helpers(helper) }

  config.include(ControllerLevelHelpers, type: :view)
  config.before(:each, type: :view) { initialize_controller_helpers(view) }

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.default_formatter = 'doc' if config.files_to_run.one?

  config.shared_context_metadata_behavior = :apply_to_host_groups

  # This allows you to limit a spec run to individual examples or groups
  # you care about by tagging them with `:focus` metadata. When nothing
  # is tagged with `:focus`, all examples get run. RSpec also provides
  # aliases for `it`, `describe`, and `context` that include `:focus`
  # metadata: `fit`, `fdescribe` and `fcontext`, respectively.
  config.filter_run_when_matching :focus

  config.example_status_persistence_file_path = 'spec/examples.txt'
  # Many RSpec users commonly either run the entire suite or an individual
  # file, and it's useful to allow more verbose output when running an
  # individual spec file.
  if config.files_to_run.one?
    # Use the documentation formatter for detailed output,
    # unless a formatter has already been configured
    # (e.g. via a command-line flag).
    config.default_formatter = 'doc'
  end

  # Print the 10 slowest examples and example groups at the
  # end of the spec run, to help surface which specs are running
  # particularly slow.
  config.profile_examples = 10 unless ENV['SKIP_RSPEC_PROFILE'] == 'true'

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = :random

  # Do not run smoketests by default
  config.filter_run_excluding smoketest: true

  # Seed global randomization in this process using the `--seed` CLI option.
  # Setting this allows you to use `--seed` to deterministically reproduce
  # test failures related to randomization by passing the same `--seed` value
  # as the one that triggered the failure.
  Kernel.srand config.seed

  # # Silence normal program output (cf. https://stackoverflow.com/questions/15430551/suppress-console-output-during-rspec-tests#15432948)
  # original_stderr = $stderr
  # original_stdout = $stdout
  # config.before(:all) do
  #   # Redirect stderr and stdout
  #   $stderr = File.open(File::NULL, "w")
  #   $stdout = File.open(File::NULL, "w")
  # end
  # config.after(:all) do
  #   $stderr = original_stderr
  #   $stdout = original_stdout
  # end
end
