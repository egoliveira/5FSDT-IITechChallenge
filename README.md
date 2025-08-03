# 5FSDT-IITechChallenge

[![Coverage Status](https://coveralls.io/repos/github/egoliveira/5FSDT-IITechChallenge/badge.svg?branch=master)](https://coveralls.io/github/egoliveira/5FSDT-IITechChallenge?branch=master)

Código do segundo tech challenge do curso de pós-graduação em Fullstack Development da FIAP - turma de 2025.

## Como executar os containers Docker do projeto

Crie um arquivo chamado `.env` no mesmo diretório do arquivo `docker-compose.yaml` com o seguinte conteúdo:

    POSTGRES_USER=sb
    POSTGRES_PASSWORD=scholablog
    POSTGRES_DATABASE=schola_blog
    NODE_LOCAL_PORT=3000
    NODE_DOCKER_PORT=3000

Depois, execute os comandos:

    docker compose build
    docker compose up