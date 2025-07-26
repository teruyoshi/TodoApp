FROM node:22.14-slim

ENV NODE_ENV=development

RUN apt-get update \
  && apt-get install -y --no-install-recommends tini \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 5173
EXPOSE 6006

WORKDIR /home/node/app/front

RUN mkdir -p /home/node/app/front && chown -R node:node /home/node/app/front

USER node

# 依存関係のキャッシュ活用
COPY --chown=node:node ./front/package*.json ./
RUN npm install

COPY --chown=node:node ./front ./

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["/bin/bash", "-c", "npm install && npm run dev"]
