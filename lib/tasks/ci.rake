# frozen_string_literal: true

task ci: ['with_solr']

unless Rails.env.production?
  require 'solr_wrapper/rake_task'

  task :with_solr do
    config_file = Rails.root.join('config', 'solr_wrapper_test.yml')

    SolrWrapper.wrap(config: config_file) do |solr|
      solr.with_collection(name: "hydra-test", dir: "solr/conf") do
        Rake::Task['spec'].invoke
      end
    end
  end
end
