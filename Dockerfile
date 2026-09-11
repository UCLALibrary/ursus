FROM ruby:3.4-bookworm

RUN gem install bundler -v 2.6.9

RUN apt-get update -qq \
	&& apt-get install --no-install-recommends -y \
		build-essential \
		chromium \
		chromium-driver \
		libatk-bridge2.0-0 \
		libgtk-3-0 \
		libmariadb-dev \
		libpq-dev \
		mariadb-client \
		nodejs \
		npm \
	&& npm install --global yarn@1.22.22 \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /ursus

# Install Ruby Gems
ENV BUNDLE_PATH=/usr/local/bundle
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
