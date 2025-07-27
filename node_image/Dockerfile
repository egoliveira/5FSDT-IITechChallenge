FROM node:24-slim

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY ./app/run_app.sh .
COPY ./app/package.json .
COPY ./app/package-lock.json .

RUN npm install

COPY ./app/dist .

COPY ./app/migrations ./migrations

EXPOSE 3000

RUN chmod +x ./run_app.sh

CMD ["./run_app.sh"]