FROM node:20.11.0-slim as node
FROM ubuntu:focal-20240123 as dev
ENV NODE_ENV=development

RUN apt-get update \
    && apt-get -qq install -y --no-install-recommends \
    tini \
    && rm -rf /var/lib/apt/lists/*
EXPOSE 5173

COPY --from=node /usr/local/include/ /usr/local/include/
COPY --from=node /usr/local/lib/ /usr/local/lib/
COPY --from=node /usr/local/bin/ /usr/local/bin/

RUN corepack disable && corepack enable

RUN groupadd --gid 1000 node \
    && useradd --uid 1000 --gid node --shell /bin/bash --create-home node \
    && mkdir /app \
    && chown -R node:node /app

USER node
COPY --chown=node:node ./front /app/front

# WORKDIR /app
WORKDIR /app/front

ENV PATH=/app/front/node_modules/.bin:$PATH
RUN npm install --only=development && npm cache clean --force
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["/bin/sh", "-c", "npm install && npm run dev"]
