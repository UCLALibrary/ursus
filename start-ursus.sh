#!/bin/bash

set -e

find . -name *.pid -delete
yarn install --frozen-lockfile
bundle exec rails ursus:sinai:off
bundle exec rails s -b 0.0.0.0
