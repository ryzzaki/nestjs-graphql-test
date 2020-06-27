## Installation

```bash
$ yarn install
```

## Running the app

```bash
# run mongodb in docker
$ docker run --name mongo -p 27017:27017 --detach mongo

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## GraphQL Playground

The playground and the GraphQL server endpoint is available at `/api/graphql`
