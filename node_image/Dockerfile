FROM node:24-slim

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY ./app/run_app.sh .
COPY ./app/package.json .
COPY ./app/package-lock.json .
COPY ./app/tsconfig.json .
COPY ./app/src ./src
COPY ./app/migrations ./migrations

RUN npm install && npm install typescript -g

RUN tsc

EXPOSE 3000

RUN chmod +x ./run_app.sh

CMD ["./run_app.sh"]