FROM node:22.14-slim as node
FROM ubuntu:24.04 as dev
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

RUN mkdir /home/ubuntu/app && chown -R ubuntu:ubuntu /home/ubuntu/app

USER ubuntu
COPY --chown=ubuntu:ubuntu ./front /home/ubuntu/app/front

WORKDIR /home/ubuntu/app/front

ENV PATH=/home/ubuntu/app/front/node_modules/.bin:$PATH
RUN npm install --only=development && npm cache clean --force
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["/bin/bash", "-c", "npm install && npm run dev"]