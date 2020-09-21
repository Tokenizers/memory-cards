# MEMORY-CARDS

## Getting Started

These instructions will get you a copy of the project

```
git clone git@github.com:Tokenizers/memory-cards.git
```

See deployment section below to deploy the project

### Prerequisites

- docker

### Installing

#### Prepare installation

##### API

- Copy `api/.env.dist` to `apps/api/.env` and edit it with custom values

##### Client

- Copy `client/.env.dist` to `apps/pwa/.env` and edit it with custom values

#### Make installation

##### API & BDD

start project by using Docker

```bash
./memory-service initialize
```

if you want to load fixtures

```bash
./memory-service hydrate

```

NOTE : Actually the front is not included in the docker-compose due to lack of time... i will do it in the week maybe :D

you can start front project manually instead

```bash
cd client && yarn start
```

## Contributors

### Developers

- **BARRAUD Romain** - Initial work
