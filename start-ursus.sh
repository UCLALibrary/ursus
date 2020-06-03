#!/bin/bash

set -e

bundle check || bundle install

find . -name *.pid -delete
yarn install
bundle exec rails ursus:sinai:off
bundle exec rails s -b 0.0.0.0
