# frozen_string_literal: true
# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :application, "ursus"
set :repo_url, "https://github.com/UCLALibrary/ursus.git"

set :deploy_to, '/opt/ursus'
set :rails_env, 'production'

if ENV['VIA_JUMP'] == "yes"
  require 'net/ssh/proxy/command'

  # Define the hostanme of the server to tunnel through
  jump_host = ENV['JUMP_HOST'] || 'jump.library.ucla.edu'

  # Define the port number of the jump host
  jump_port = ENV['JUMP_PORT'] || '31926'

  # Define the username for tunneling
  jump_user = ENV['JUMP_USER'] || ENV['USER']

  # Configure Capistrano to use the jump host as a proxy
  ssh_command = "ssh -p #{jump_port} #{jump_user}@#{jump_host} -W %h:%p"
  set :ssh_options, proxy: Net::SSH::Proxy::Command.new(ssh_command)
end

set :rollbar_token, ENV['ROLLBAR_ACCESS_TOKEN']
set :rollbar_env, proc { fetch :stage }
set :rollbar_role, proc { :app }

set :log_level, :debug
set :bundle_flags, '--deployment'

set :default_env, 'PASSENGER_INSTANCE_REGISTRY_DIR' => '/var/run'

set :keep_releases, 5
set :assets_prefix, "#{shared_path}/public/assets"

SSHKit.config.command_map[:rake] = 'bundle exec rake'

set :branch, ENV['REVISION'] || ENV['BRANCH'] || ENV['BRANCH_NAME'] || 'master'

append :linked_dirs, "log"
append :linked_dirs, "public/assets"
append :linked_dirs, "tmp/pids"
append :linked_dirs, "tmp/cache"
append :linked_dirs, "tmp/sockets"

append :linked_files, ".env.production"
append :linked_files, "config/secrets.yml"

### Ursus Feature Flags ################

# Enable Sinai Manuscripts features
if ENV['FEATURE_FLAG'] == 'sinaimanu'
  namespace :ursus do
    task :enable_sinai_manuscript_features do
      on roles(:app) do
        execute "cd #{deploy_to}/current; /usr/bin/env bundle exec rake ursus:sinai:on RAILS_ENV=production"
      end
    end
  end

  after 'deploy:published', 'ursus:enable_sinai_manuscript_features'
end

########################################
