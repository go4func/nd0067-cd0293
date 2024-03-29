# Storefront Backend Project

## .env

Create new `.env` file which contains credentials (postgres, cryptography, jwt) to run this project, see the `.env-example`.

## database migration

Required: `psql`, `db-migrate`, `db-migrate-pg`

Schemas were already in migrations folder.

1. Up postgres server in default port (`:5432`) then create database (dev, test), user with information same as in .evn file.

2. Put database info (dev, test) in `database.json` file, or use environment variables.

3. Run `npm run db-up` or `db-migrate up`.

4. Verify that the tables were created by migration by going to `psql` and checking for the tables.

## scripts

Please run `npm ci --verbose` first to install required package

- migrate db: `npm run db-up`
- reset db: `npm run db-reset`
- start: `npm run start`, server will be served in port `:3000`
- reset test db: `npm run db-test-reset`
- test: `npm run test`
- prettier: `npm run prettier`
- lint: `npm run lint`

## API

For API that requires token: user need to login to get the token first, then set it in Authorization header of required API.
