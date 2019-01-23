FROM ruby:2.5

RUN gem install bundler
# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1
RUN apt-get update -qq && apt-get install -y mysql-client build-essential libpq-dev nodejs

ENV BUNDLE_PATH /usr/local/bundle
COPY start-ursus.sh /start-ursus.sh

CMD ["sh", "/start-ursus.sh"]
