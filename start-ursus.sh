#!/bin/bash

bundle check || bundle install

find . -name *.pid -delete
bundle exec rails s
