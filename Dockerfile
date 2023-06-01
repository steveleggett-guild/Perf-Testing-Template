FROM mcr.microsoft.com/playwright:v1.29.0-focal
WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY playwright.config.ts .
COPY tests ./tests
COPY lib ./lib
COPY pageFactory ./pageFactory
COPY pageRepository ./pageRepository
COPY upload ./upload
COPY global-setup.ts .
COPY global-teardown.ts .
RUN yarn install --no-lockfile

