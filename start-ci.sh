set -e

bundle exec rubocop
bundle exec erblint --lint-all
yarn run lint
spring rails db:setup
spring rspec