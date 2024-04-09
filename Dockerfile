FROM mongo:latest

COPY ./scripts/mongodb/init.js /docker-entrypoint-initdb.d/init.js

CMD ["mongod", "--quiet"]
