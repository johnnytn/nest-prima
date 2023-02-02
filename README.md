# Node.js Challenge

## How to run the project (WIP)

### api-service

```
$ cd api-service
$ npm i

$ docker-compose up
$ npm run start
```

### stock-service

```
$ cd stock-service

$  npm i
$ npm run start
```

## Details

All the endpoints should work as on the Instructions, and a swagger docs can be seen [here](http://localhost:3001/docs)

## Endpoints:

- **POST** /register - _for basic registration_
- **GET** /stock?q=code - _to fetch stock data_
- **GET** /history - _to see the user stock history_
- **GET** /stats - _to see the most requested stocks (admin only route)_
