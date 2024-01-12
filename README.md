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

## Development

This section gives basic instructions to get Ursus running locally. More extensive developer documentation is maintained [in the wiki](https://github.com/UCLALibrary/amalgamated-samvera/wiki).

### Install and run locally

Ursus is a Blacklight application and only needs Solr and Fedora.

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

#### OAI https://digital.library.ucla.edu/catalog/oai  --->
