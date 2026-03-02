FROM swift:5.9

WORKDIR /app

# install node
RUN apt-get update && apt-get install -y nodejs npm

COPY package.json .
RUN npm install

COPY server.js .
COPY whirl .

RUN chmod +x ./whirl

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]