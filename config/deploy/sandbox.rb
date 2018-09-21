set :rails_env, 'production'
server 'ursus.curationexperts.com', user: 'deploy', roles: [:web, :app, :db]
