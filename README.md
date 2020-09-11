# UCLA Library Management - Ursus

<img align="left" width="150" src="http://digital2.library.ucla.edu/imageResize.do?contentFileId=78999&scaleFactor=0.4">

---

#### Ursus is designed as the public interface for UCLA's digital library content.

[Bruin Bear (statue)](http://digital2.library.ucla.edu/viewItem.do?ark=21198/zz0009b6bm)
In 1984 to mark its 50th Anniversary, the UCLA Alumni Association commissioned "Mighty Bruins" and presented the Bruin Bear Statue to the university. The [statue](http://www.publicartinla.com/UCLAArt/bruin_bear.html) is now a campus landmark and a focal point in Westwood Plaza.

---

[![Build Status](https://travis-ci.org/UCLALibrary/ursus.svg?branch=master)](https://travis-ci.org/UCLALibrary/ursus)
[![Apache 2.0 License](http://img.shields.io/badge/APACHE2-license-blue.svg)](./LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/UCLALibrary/ursus/badge.svg?branch=ci%2Fadd-coveralls)](https://coveralls.io/github/UCLALibrary/ursus?branch=ci%2Fadd-coveralls)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/UCLA-Library-Software-Development/ursus)

---

## Development

This section gives basic instructions to get Ursus running locally. More extensive developer documentation is maintained [in the wiki](https://github.com/UCLALibrary/amalgamated-samvera/wiki).

### Install and run locally

Ursus is a Black application and only needs Solr and Fedora.

Ursus can be locally run in two ways:

- Running in standalone mode
- Running in conjunction with local instance Californica

### Running in standalone mode

Clone the repo from GitHub and change directories into the repo:

```
git clone git@github.com:UCLALibrary/ursus.git
cd ursus
```

Set up the databases:

```
docker-compose run web bundle exec rails db:setup
docker-compose run sinai bundle exec rails db:setup
```

Bring up the development environment. Do this _after_ setting up the databases - the startup scripts require the database to be ready so that they can set feature flags e.g. for the sinai UI mode.

```
docker-compose up
```

Ursus should now be running with its regular look on [port 3003](http://localhost:3003), and on [port 3004](http://localhost:3004) with the [Sinai Manuscripts Digital Library](https://sinaimanuscripts.library.ucla.edu/) UI enabled.

The file `docker-compose-standalone.yml` includes a setup with a clone of the ursus-stage and sinai-stage solr indexes, so you do not need to run californica and manually ingest material (in fact, californica should #not# be running to avoid port conflicts.)

You can select this setup in one of three ways:

- Delete the file `docker-compose.yml`, which by default is a symlink to `docker-compose-with-californica.yml`. Then run `ln -s docker-compose-standalone.yml docker-compose.yml` to create a new symlink.
- Set the environment variable `COMPOSE_FILE=docker-compose-standalone.yml`. You can do this in each terminal you open or add it to an `ursus/.env` file (you can start one with `cp default.env ursus.env`.)
- Every time you run `docker-compose`, add the flag `-f docker-compose-standalone.yml` _before_ any subcommands (e.g. `docker-compose -f docker-compose-standalone.yml run web bash`.)

### Running in conjunction with local instance Californica

First, install [Californica](https://github.com/UCLALibrary/californica) and ingest some data; make sure californica is running so ursus can point to its data.

Clone the repo from GitHub and change directories into the repo:

```
git clone git@github.com:UCLALibrary/ursus.git
cd ursus
```

```
# Open a tab in your terminal
cd .../ursus
docker-compose run web bundle exec rails db:setup
docker-compose run sinai bundle exec rails db:setup
docker-compose -f docker-compose-with-californica.yml up

# Open a second tab in your terminal
cd .../ursus
docker-compose -f docker-compose-with-californica.yml run web bash

# Open a third tab in your terminal
cd .../ursus
docker-compose -f docker-compose-with-californica.yml run sinai bash

# Open a fourth tab in your terminal for git commands
cd .../ursus
git ...
```

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

Visual regression testing is done via [percy.io](https://percy.io/UCLA-Library-Software-Development/ursus). This runs only for pull requests on travis; it should not be run locally.
