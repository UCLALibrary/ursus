FROM ruby:2.5

RUN gem install bundler
# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1
RUN apt-get update -qq && apt-get install -y mysql-client build-essential libpq-dev nodejs

# Install Ruby Gems
RUN gem install bundler
ENV BUNDLE_PATH /usr/local/bundle
WORKDIR /californica
COPY Gemfile /californica/Gemfile
COPY Gemfile.lock /californica/Gemfile.lock
RUN bundle install


# Add californica
COPY / /ursus
CMD ["sh", "/ursus/start-ursus.sh"]
