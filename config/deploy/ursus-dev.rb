set :rails_env, 'production'
server 'ursus-dev.library.ucla.edu', user: 'deploy', roles: [:web, :app, :db]
