## Description

This repository contains the backend code for the Technology Associate Programme 2023 Assignment by GDS Central.

The problem selected is Problem 2: [Snippet Sharing Service]

The assignment was initiated on 22 September 2023 3:19:30pm with a dealine of 72 hours (ResponseID: 650d4002c7baae00125f3be1)

## Prerequisites

- node >= v18.18.0
- yarn >= 1.22.19
- Docker Desktop >= version 24.0.5, build ced0996

## Code architecture

The code follows the NestJS recommended architecture closely, with controllers handling requests and services handling most of the logic. There is only one module for this project `SnippetsModule`, which handles all the operations on a `Snippet` resource

- `PrismaService` serves as an abstraction over the `PrismaClient`, this is done to facilitate dependency injection into the other modules so that they can be used in the services.
- `SnippetsController` contains the endpoints for the `/snippets` API, it routes the incoming requests to the respective handlers.
- `SnippetsService` contains the business logic and data access logic, it interacts with the `PrismaService` to perform queries.
- DTO objects are created for certain endpoints and validated using `class-validator` and `ValidationPipe` provided by NestJS to return user-friendly errors on bad request bodies/params.

## Technologies used

Below are some of the technologies I decided to use for the project with a short writeup as a justification

- **[NestJS](https://nestjs.com/)**

  - Meta-framework that provides a structured way to create backend servers, makes use of decorator pattern an dependency injection. Built with TypeScript in mind ensuring type safety and clean code. Also has many built-in plugins for common uses such logging, testing, middleware and validation. I decided to use it here as it provides a sound and structured way of creating endpoints and other useful middleware so I can focus solely on business logic.

- **[PostgreSQL](https://www.postgresql.org/) ([Supbase](https://supabase.com/))**

  - PostgreSQL is an open source relational database. I decided to use it in this project due to my familiarity with SQL databases and also vast community plugins and documentation to facilitate easy working with PostgreSQL. Supabase is used as the hosting option for the PostgreSQL database as it is free, quick and easy to setup.

- **[Prisma](https://www.prisma.io/)**

  - Prisma is used as the ORM of choice due to its developer experience, providing generated types and repositories to support easy data access for models. It also is very easy to migrate the database and the `prisma.schema` serves as the single source of truth for data models so that we can focus more on business logic.

- **[Cyclic](https://www.cyclic.sh/)**

  - Cyclic is used to host the NestJS API on the web, it is used as it is free and also because it is quick and easy nature of deploying along with automatic deploy workflow integrated with Github Actions on push to `master`.

- **[Docker](https://docker.com)**

  - Docker Compose is used to set up the database in local environments, it is used to prevent any incompatabilities in setting up database and also offering a clean slate as long as we rebuild and restart the containers.

- **Other libraries**
  - `pino` for logging and debugging
  - `class-validator` and `class-transformer` for validating DTO objects

## Caveats/Improvements

Due to the time and resource constraints of completing the assignment. There were some additional tasks or features that were under consideration that were skipped.

- **Containerization and Deployment** - Dockerize and deploy on AWS Fargate
- **Configuring CORS** - Setup CORS to only accept incoming requests from hosted frontend
- **Users and Auth** - Allowing creation of users such that they can edit/delete snippets they own
- **Unit and Integration testing** - Testing of service and controllers

## Setup

Firstly, install the dependencies

```bash
$ yarn install
```

For local testing, setup the database as below

First create a docker container of the PostgreSQL database

```bash
$ docker-compose up
```

Migrate the prisma schema to make sure models are in sync and that the `PrismaClient` is generated

```bash
$ yarn prisma migrate dev
```

See the database with some initial data for testing

```bash
$ yarn prisma db seed
```

After all that is done, you can run the app using the following command

```bash
$ yarn start:dev
```

If the app has successfully started, you will see a line like so in the terminal

```
INFO [13:42:17.898] (on pc1): Nest application successfully started {"context":"NestApplication"}
```

You can now access the backend server at [`http://localhost:3000`](http://localhost:3000)

Swagger is use to generate OpenAPI documentation. After running the app, you can access the api documentation at [`http://localhost:3000/api`](http://localhost:3000/api)

## Author

- [Goh Chen Kang, Sean](mailto:gohcksean@gmail.com)
