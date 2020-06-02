#!/bin/bash

set -e

bundle check || bundle install
spring rubocop
bundle exec erblint --lint-all

yarn install
yarn run lint

spring rspec spec

yarn run pa11y-ci --threshold 10
