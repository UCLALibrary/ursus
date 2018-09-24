# frozen_string_literal: true
# config valid for current version and patch releases of Capistrano
lock "~> 3.11.0"

set :application, "ursus"
set :repo_url, "https://github.com/UCLALibrary/ursus.git"

set :deploy_to, '/opt/ursus'

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

set :log_level, :debug
set :bundle_flags, '--deployment'

set :keep_releases, 5
set :assets_prefix, "#{shared_path}/public/assets"

SSHKit.config.command_map[:rake] = 'bundle exec rake'

set :branch, ENV['REVISION'] || ENV['BRANCH_NAME'] || 'master'

append :linked_dirs, "log"
append :linked_dirs, "public/assets"

append :linked_files, ".env.production"
append :linked_files, "config/database.yml"
append :linked_files, "config/secrets.yml"

# We have to re-define capistrano-sidekiq's tasks to work with
# systemctl in production. Note that you must clear the previously-defined
# tasks before re-defining them.
Rake::Task["sidekiq:stop"].clear_actions
Rake::Task["sidekiq:start"].clear_actions
Rake::Task["sidekiq:restart"].clear_actions
namespace :sidekiq do
 task :stop do
   on roles(:app) do
     execute :sudo, :systemctl, :stop, :sidekiq
   end
 end
 task :start do
   on roles(:app) do
     execute :sudo, :systemctl, :start, :sidekiq
   end
 end
 task :restart do
   on roles(:app) do
     execute :sudo, :systemctl, :restart, :sidekiq
   end
 end
end

# Capistrano passenger restart isn't working consistently,
# so restart apache2 after a successful deploy, to ensure
# changes are picked up.
namespace :deploy do
  after :finishing, :restart_apache do
    on roles(:app) do
      execute :sudo, :systemctl, :restart, :httpd
    end
  end
end
