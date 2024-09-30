# UCLA Library Management - Ursus

<img align="left" width="150" src="http://digital2.library.ucla.edu/imageResize.do?contentFileId=78999&scaleFactor=0.4">

---

#### Ursus is designed as the public interface for UCLA's digital library content.

[Bruin Bear (statue)](http://digital2.library.ucla.edu/viewItem.do?ark=21198/zz0009b6bm)
In 1984 to mark its 50th Anniversary, the UCLA Alumni Association commissioned "Mighty Bruins" and presented the Bruin Bear Statue to the university. The [statue](http://www.publicartinla.com/UCLAArt/bruin_bear.html) is now a campus landmark and a focal point in Westwood Plaza.

---

[![Build Status](https://travis-ci.org/UCLALibrary/ursus.svg?branch=main)](https://travis-ci.org/UCLALibrary/ursus)
[![Apache 2.0 License](http://img.shields.io/badge/APACHE2-license-blue.svg)](./LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/UCLALibrary/ursus/badge.svg?branch=ci%2Fadd-coveralls)](https://coveralls.io/github/UCLALibrary/ursus?branch=ci%2Fadd-coveralls)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/UCLA-Library-Software-Development/ursus)

---

## Debug Branch

This is a branch that supports visual debugging in VSCode.

To start a debugging session:

- Download and manually install deprecated [Ruby extension by Peng Lv](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)
- To install, download file above, then in VSCode:
  - Click Extensions (Lego block icon on left)
  - Choose `...` in top of EXTENSIONS column
  - Choose `Install from VSIX...`
  - Navigate to downloaded file and choose
- Confirm `.vscode/launch.json` is present and directories accurate
- Before you start the application, set a breakpoint anywhere in the application. A missing breakpoint seemed to crash debugger.
- First time, set up database like you normally would: `docker-compose run web bundle exec rails db:setup`
- Run `docker-compose -f docker-compose.yml -f docker-compose-debug.yml up`
- Choose Debug or F5, this will attach to debugging process

Note: This is very delicate branch due to older debugging libraries.
The following combo is verified working:

- debase-ruby_core_source (= 0.10.5)
- debase (= 0.2.4)
- ruby-debug-ide (= 0.7.0)

I had problems with deviations from the above combo. Not installing `debase-ruby_core_source (= 0.10.5)` explicitly would jump to `debase-ruby_core_source (= 3.x)` and not work.

The reason for old gem installs is the debug gem significantly changes starting in [2.7](https://github.com/ruby/debug), these changes are to enable visual debugging in 2.6.

## Development

This section gives basic instructions to get Ursus running locally. More extensive developer documentation is maintained [in the wiki](https://github.com/UCLALibrary/amalgamated-samvera/wiki).

### Install and run locally

Ursus is a Blacklight application and only needs Solr and MySQL.

Ursus can run locally in two ways:

1. Stand alone mode
1. In conjunction with local instance of Californica

---

## Standalone mode

The file `docker-compose-standalone.yml` includes a setup with a clone of the ursus-stage and sinai-stage solr indexes, so you do not need to run californica and manually ingest material (in fact, californica should #not# be running to avoid port conflicts.)

#### 1. Clone the repo from GitHub

```
git clone git@github.com:UCLALibrary/ursus.git
```

#### 2. Change directories into the repo

```
cd ursus
```

#### 3. Set up the databases

```
docker-compose run web bundle exec rails db:setup
```

#### If the above commnad throws folowing error

```
 docker-compose run web bundle exec rails db:setup
Could not find rails_autolink-1.1.8 in any of the sources
Run `bundle install` to install missing gems.
```

- Running this command

```
docker-compose up --build
```

\*\* Then run the following command again

```
docker-compose run web bundle exec rails db:setup
```

#### 4. Bring up the development environment

** Do this _after_ setting up the databases** - the startup scripts require the database to be ready so that they can set feature flags e.g. for the Sinai UI mode.

```
docker-compose up
```

#### Ursus should now be running

- Ursus / [UCLA Library Digital Collections](https://digital.library.ucla.edu/) UI is enabled on [port 3003](http://localhost:3003)

The data you're viewing is coming from a solr instance, preloaded with data from [Californica-test]
(https://californica-test.library.ucla.edu), and should not need to be changed in most cases,
since Ursus is a discovery interface only.
You can view the solr console on port 8983.

---

### Running linters and unit tests

Connect to a shell _inside_ the container with:

```
docker-compose run web bash
```

Then run the entire suite, except for the cypress integration test, with:

```
sh start-ci.sh
```

You can inspect the `start-ci.sh` script to see which linters and tests this invokes.

Or individually:

1. root@ursus:/ursus# bundle exec erblint --lint-all
1. root@ursus:/ursus# yarn run lint
1. root@ursus:/ursus# rubocop

## Ursus WITH Californica's database

Go to the `docker.env` file for directions

#### In the `docker.env file`

1. Comment out `SOLR_URL=http://solr:8983/solr/ursus`

2. Uncomment this line `SOLR_URL=http://host.docker.internal:8983/solr/californica`

3. In your terminal run $`docker-compose -f docker-compose-with-californica.yml up`

#### Before deploying

1. Be sure to comment out `SOLR_URL=http://host.docker.internal:8983/solr/californica`

2. And uncomment this line `SOLR_URL=http://host.docker.internal:8983/solr/californica`

#### You cannot run `docker-compose run web bash` in this environment.

---

#### Steps to connect to Ursus Maria db

Here's how you can do it using Docker and Docker Compose commands.

### Step 1: Access the Database Container

```
docker-compose exec db bash
```

### Step 2: Log into the MariaDB Database

```
mysql -u root
```

### Step 3: Check Your Tables

```
USE ursus_development;
```

## Then, list all tables:

```
SHOW TABLES;
```

## You can also check the schema of a specific table:

```
DESCRIBE users;
```

```
DESCRIBE searches;
```

## You can run sql queries:

```
select * from searches;
```

### Exiting the Shell

```
exit;
```

### Additional Tips

Rails Console: For Rails-specific data inspection or manipulation, you can also use the Rails console. Run docker-compose exec web rails console to access it. This is particularly useful for operations that involve Rails models.

---

#### Running Rake tasks

- To run the Rake task, open a terminal, navigate to the root of your Rails application, and execute:

```
docker-compose run web bash
rake blacklight:clear_tables
```

- Or, if you are using Rails 5.1 or later, you should use the rails command instead:

```
docker-compose run web bash
rails blacklight:clear_tables
```

---

### Running the integration tests

First, you will need to install node.js and npm locally.

Then cd into the `e2e` directory and install the javascript dependencies:

```
cd e2e
npm install
```

Next, you can either open the cypress test runner GUI with:

```
npx cypress open
```

or run the tests in the command line:

```
npx cypress run
```

### Visual regression tests

Visual regression testing is done via [percy.io](https://percy.io/UCLA-Library-Software-Development/ursus). This runs only for pull requests on travis; it will not run locally.

### Rebuilding the image

If you need to rebuild the docker image (for example, if packages were added to the Gemfile), run:

1. `docker-compose pull`
1. `docker-compose up --build`

#### OAI https://digital.library.ucla.edu/catalog/oai --->
