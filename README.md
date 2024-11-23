## Monorepo

Implementation nestjs-monorepo (microservices)

This repository shows how you can organize the structure in monorepo.

Feel free to copy, add and use this

## Tools used

-  [Nest JS](https://nestjs.com/)
-  [Prisma](https://www.prisma.io/)
-  [Docker](https://www.docker.com/)

## First start

Before the start you need to install docker and run it.

1.Clone repository

2.Install dependencies

```bash
npm i
```

3.Start dev database

```bash
docker-compose --profile dev up -d 
```

4.Migrate prisma schema

```bash
npm run migrate-dev
```

4.Start all apps

```bash
npm run start:micro
```

## Start prod

Before the start you need to install docker and run it.


```bash
docker-compose --profile prod up -d 
```

## Documentation

After the start applications:

-  [Swagger](http://localhost:3000/api-documentation)

## Postman

If you want to test endpoints. You can import this file in Postman

- nestjs-monorepo.postman_collection.json

## Structure

```
.
├── Dockerfile
├── README.md
├── apps
│   ├── gateway
│   │   ├── Dockerfile
│   │   ├── src
│   │   │   ├── gateway.module.ts
│   │   │   ├── main.ts
│   │   │   ├── post
│   │   │   │   ├── post.controller.ts
│   │   │   │   └── post.module.ts
│   │   │   └── user
│   │   │       ├── user.controller.ts
│   │   │       └── user.module.ts
│   │   └── tsconfig.app.json
│   ├── post
│   │   ├── Dockerfile
│   │   ├── src
│   │   │   ├── main.ts
│   │   │   ├── post.controller.ts
│   │   │   ├── post.module.ts
│   │   │   └── post.service.ts
│   │   └── tsconfig.app.json
│   └── user
│       ├── Dockerfile
│       ├── src
│       │   ├── main.ts
│       │   ├── user.controller.ts
│       │   ├── user.module.ts
│       │   └── user.service.ts
│       └── tsconfig.app.json
├── docker-compose.yml
├── environment.d.ts
├── libs
│   ├── src
│   │   ├── constants
│   │   │   ├── patterns
│   │   │   │   ├── post.ts
│   │   │   │   └── user.ts
│   │   │   └── services.ts
│   │   ├── dto
│   │   │   ├── entity.dto.ts
│   │   │   ├── post
│   │   │   │   ├── create.dto.ts
│   │   │   │   ├── delete.dto.ts
│   │   │   │   ├── post.dto.ts
│   │   │   │   └── update.dto.ts
│   │   │   └── user
│   │   │       ├── create.dto.ts
│   │   │       ├── delete.dto.ts
│   │   │       ├── update.dto.ts
│   │   │       └── user.dto.ts
│   │   ├── filters
│   │   │   └── exception-up.filter.ts
│   │   ├── modules
│   │   │   └── database
│   │   │       ├── prisma.module.ts
│   │   │       └── prisma.service.ts
│   │   └── services
│   │       └── micro
│   │           └── service.ts
│   └── tsconfig.lib.json
├── migration.sh
├── nest-cli.json
├── nestjs-monorepo.postman_collection.json
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20241121165743_init
│   │   │   └── migration.sql
│   │   ├── 20241121171613_adding_dates_fields
│   │   │   └── migration.sql
│   │   ├── 20241121182847_adding_cascade
│   │   │   └── migration.sql
│   │   ├── 20241122112740_uniq_name
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── tsconfig.build.json
└── tsconfig.json

```

## Node version

- node - 20.16.0
- npm - 10.8.1

