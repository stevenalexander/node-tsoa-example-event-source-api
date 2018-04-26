# Node TSOA example event source API

[![BuildStatus](https://travis-ci.org/stevenalexander/node-tsoa-example-event-source-api.svg?branch=master)](https://travis-ci.org/stevenalexander/node-tsoa-example-event-source-api?branch=master)

Example Node API application with automatic generated Swagger documentation and static type checking on model objects, with model/request definitions shared via external versioned models module. Uses [Event Sourcing](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) pattern to store changes to the users as events, rather than CRUD. Uses [CQRS](https://docs.microsoft.com/en-us/azure/architecture/patterns/cqrs) pattern in services to persist and retrieve information and requires a [PostGresSQL](https://www.postgresql.org/) database instance.

This repo is part of a collection of repos that make up the entire example solution, [web](https://github.com/stevenalexander/node-tsoa-example-web), [api](https://github.com/stevenalexander/node-tsoa-example-api), [event sourcing api](node-tsoa-example-event-source-api) and [models](https://github.com/stevenalexander/node-tsoa-example-models).

Uses [TSOA](https://github.com/lukeautry/tsoa) to generate routes and swagger documentation based on decorated controllers and models. Provides a well structured Node API with type checked models and business logic with documentation aiding external parties to consume it. Services required by the controllers are injected into them using Dependency Injection via [Inversify](https://www.npmjs.com/package/inversify).

![swagger](https://raw.githubusercontent.com/stevenalexander/node-tsoa-example/master/images/swagger.png "swagger doc")

Based on tutorial from github example and [here](https://medium.com/willsonic/swagger-nodejs-typescript-tsoa-15a3f10fabaf).

Requires:
* NodeJS (v8+)
* PostGresSQL (v9+)

## Overview

* `src/controllers` - controllers for API
* `src/services` - services used by controllers
* `src/errors` - custom errors
* `src/swagger-ui` - static html used for serving swagger documentation as html UI
* `src/routes.ts` - TSOA generated routes from command `npm run-script routes-gen`
* `src/server.ts` - start script for Express
* `src/ioc.ts` - [Inversify IoC container](https://www.npmjs.com/package/inversify), see [here](https://github.com/lukeautry/tsoa#dependency-injection--ioc) for details
* `src/knexfile` - Database configuration for [knex](http://knexjs.org/) query builder used in persistence and migrations
* `tsconfig.json` - TypeScript config for `tsc` compile used to generate Javascript
* `tslint.json` - TypeScript linting config setup to mimic StandardJS
* `tsoa.json` - TSOA config, see [here](https://github.com/lukeautry/tsoa) for details
* `dist` - folder for generate JavaScript
* `dist/swagger.json` - TSOA generated swagger doc from command `npm run-script swagger-gen`

## Run

### PostGresSQL in Docker

```
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
```

### Application

```
npm install
npm start # http://localhost:3001/docs
```

## Debug

TypeScript compile generates maps, so you can debug the application using Chrome Dev tools against both TypeScript files and generated JavaScript.

```
npm run-script build
node --inspect dist/server.js # open chrome://inspect and connect to debugger
```

## Updating models

The models module, used for DTO and request/response object definitions, is imported from a separate repository [here](https://github.com/stevenalexander/node-tsoa-example-models).

To update, change the tagged version in `package.json` to required branch, e.g.:

```
"tsoa-example-models": "git+https://github.com/stevenalexander/node-tsoa-example-models.git#v0.1"
```

You can use a local path for the module, allowing local devleopment:

```
npm install --save file://src/node-tsoa-example-models
# "tsoa-example-models": "file:../node-tsoa-example-models"
```