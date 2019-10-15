FROM ruby:2.5

RUN gem install bundler

RUN apt-get update -qq
# Add https support to apt to download yarn & newer node
RUN apt-get install -y  apt-transport-https

# Add node and yarn repos and install them along
# along with other rails deps
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq
RUN apt-get install mariadb-client build-essential libpq-dev yarn nodejs chromium-driver libatk-bridge2.0-0 libgtk-3.0 -y

# Install Ruby Gems
RUN gem install bundler
ENV BUNDLE_PATH /usr/local/bundle
WORKDIR /californica
COPY Gemfile /californica/Gemfile
COPY Gemfile.lock /californica/Gemfile.lock
RUN bundle install

# Create a non-root user
RUN useradd -ms /bin/bash  ursus

# Add californica
COPY / /ursus
CMD ["sh", "/ursus/start-ursus.sh"]
