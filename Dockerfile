FROM mongo:latest

COPY ./scripts/init.js /docker-entrypoint-initdb.d/init.js

CMD ["mongod", "--quiet"]
