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
RUN apt-get install mariadb-client build-essential libpq-dev yarn nodejs=8.17.0-1nodesource1 chromium-driver libatk-bridge2.0-0 libgtk-3.0 -y

# Cypress dependencies - won't want these in prod
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

WORKDIR /ursus

# Install Ruby Gems
ENV BUNDLE_PATH /usr/local/bundle
COPY Gemfile ./Gemfile
COPY Gemfile.lock ./Gemfile.lock
RUN bundle install

# Install node packages
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./config/uv ./config/uv
RUN yarn install --frozen-lockfile

# Add ursus
COPY / /ursus
CMD ["sh", "./start-ursus.sh"]

EXPOSE 3000
