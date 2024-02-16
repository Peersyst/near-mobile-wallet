FROM node:18.15.0 as base

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn lint

# RUN yarn test:unit:ci

FROM node:18.15.0 as build

ARG PROFILE=development
ARG BUILD_NUMBER=1
ARG EXPO_TOKEN
ENV EXPO_TOKEN=$EXPO_TOKEN

WORKDIR /app

COPY --from=base /app .
RUN sed -i -e "s/__BUILD_NUMBER__/$BUILD_NUMBER/" eas.json

RUN npx eas-cli build --platform=ios --auto-submit --profile=$PROFILE --non-interactive --no-wait
RUN npx eas-cli build --platform=android --profile=$PROFILE --non-interactive --no-wait
