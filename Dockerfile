FROM ruby:2.5

RUN gem install bundler

RUN apt-get update -qq
# Add https support to apt to download yarn & newer node
RUN apt-get install -y  apt-transport-https

# Add yarn repo and install along with other rails deps
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq
RUN apt-get install mariadb-client build-essential libpq-dev yarn nodejs chromium-driver libatk-bridge2.0-0 libgtk-3.0 -y

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
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl --fail http://localhost:3000 || exit 1" ]
