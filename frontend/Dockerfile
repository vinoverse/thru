From node:16.14.2

Workdir /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install react-script@5.0.1 -g

CMD ["npm", "start"]