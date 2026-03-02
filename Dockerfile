FROM node:20-slim

WORKDIR /app

COPY package.json .
RUN npm install

COPY server.js .
COPY whirl .

RUN chmod +x ./whirl

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]