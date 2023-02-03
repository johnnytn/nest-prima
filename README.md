# Node.js Challenge

## How to run the project (WIP)

### api-service

```bash
$ cd api-service

$ npm i
# create db container
$ docker-compose up

$ npm run start
```

### stock-service

```bash
$ cd stock-service

$  npm i

$ npm run start
```

## Test

```bash
$ cd <project_name>
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Details

All the endpoints should work as on the Instructions, and a swagger docs can be seen [here](http://localhost:3001/docs)

## Endpoints:

for yours praticality theese endpoints were moved to the root as well

- **POST** /register - _for basic registration_
- **POST** /auth/reset-passowrd - _to reset user's password_
- **GET** /stock?q=code - _to fetch stock data_
- **GET** /history - _to see the user stock history_
- **GET** /stats - _to see the most requested stocks (admin only route)_

## Unit test

- UserService (user.service.spec)
- StockService (stock.service.spec) (wiṕ)
