FROM node as build

RUN apt-get install -y git

WORKDIR /src

COPY package.json /src

RUN npm install

COPY . /src

CMD ["npm", "start"]