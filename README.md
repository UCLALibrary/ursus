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

#### Development Environment

1. Install MySQL (or MariaDB)
1. Ensure that Java, Rails > 5, and Ruby > 2.2 are installed 
1. Run `bundle install` 
1. Create an `ursus` database user, `urus_development` and `ursus_test` database and grant that user 
   all permissions to the ursus databases. 
1. Run `rails db:migrate`
1. Edit the `config/blacklight.yml` to point to a Californica solr index or another index 
1. Run `rails s`
