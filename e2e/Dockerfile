FROM cypress/browsers:node10.16.3-chrome80-ff73

WORKDIR /e2e

# Install node packages
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

COPY . ./

CMD echo "e2e container is ready: run tests with 'docker-compose run e2e sh start-e2e.sh'"