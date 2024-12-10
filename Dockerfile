FROM node:lts-alpine

ENV NODE_ENV=production

USER node

RUN mkdir -pv /home/node/app

WORKDIR /home/node/app

COPY --chown=node . .

RUN npm install-clean \
    && npm run build

CMD ["npm", "run", "start"]