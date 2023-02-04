# Node.js Challenge

## How to run the project

### Api-service

```bash
$ cd api-service

$ npm i
# create db container
$ docker-compose up

$ npm run start
```

### Stock-service

```bash
$ cd stock-service

$ docker-compuse up
```

or

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

- **POST** /register - _for basic registration_
- **POST** /auth/reset-passowrd - _to reset user's password_
- **GET** /stock?q=code - _to fetch stock data_
- **GET** /history - _to see the user stock history_
- **GET** /stats - _to see the most requested stocks (admin only route)_

## Unit test ( api-service)

- UserService (user.service.spec)
- StockService (stock.service.spec) (wip)

## Unit test ( stock-service)

- AppService (app.service.spec)
- AppController ( app.e2e-spec )

## Prima Studio

Prisma offers a management enviroment that can be access through:

```bash
$ npx prisma studio

or

$ npm run prisma
```

## Email

To use the email service add the configuration into the .env file
