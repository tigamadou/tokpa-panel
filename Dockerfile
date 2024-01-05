FROM node:16

WORKDIR /tokpa_bj

COPY package.json /tokpa_bj
RUN yarn
COPY . .

RUN yarn run build 