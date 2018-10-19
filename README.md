UCLA Library Management -- Ursus
=================================

Development
-----------

### Prerequisites

Requirements:
1. Ruby and Bundler
1. MySQL (or MariaDB), Node.js, and Java
1. Various build tools (Ubuntu packages are listed below - not sure about other
   distros...)

#### Development Environment Initial Setup

1. Install MySQL (or MariaDB)
1. Ensure that Java, Rails > 5, and Ruby > 2.2 are installed 
1. Run `bundle install` 
1. Create an `ursus` database user, `urus_development` and `ursus_test` database and grant that user 
   all permissions to the ursus databases. 
1. Run `rails db:migrate`
1. To configure your `development` and `test` environments, create files called `.env.development` and `.env.test`.  You can use the `dotenv.sample` file as an example for which environment variables you need to set.
1. Make sure the `config/blacklight.yml` points to the solr index from your Californica environment. (This should be handled by the environment variables in the `.env.*` files)

#### Running Development Environment

1. Make sure the solr from your Californica `development` environment is running.
1. Make sure mysql is running
1. Run `rails s -p 3001`.  (If you are running both Californica and Ursus at the same time, they can't both use Rails default port 3000, so you'll have to change one of them.)
1. Visit `http://localhost:3001` in your browser (or whatever host and port you have configured for Rails)

#### Running the Test Suite

1. Make sure the solr from your Californica `test` environment is running.
1. Make sure mysql is running
1. Run `rspec spec`

