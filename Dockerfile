FROM node:lts-alpine

USER node

RUN mkdir -pv /home/node/app

WORKDIR /home/node/app

COPY --chown=node . .

RUN npm install \
    && npm run build

CMD ["npm", "run", "start"]