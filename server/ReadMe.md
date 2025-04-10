# Prisma CLI Commands

This document provides a comprehensive list of useful Prisma CLI commands, categorized for easy reference.

## Initialization & Setup

* **`prisma init`**: Initializes a new Prisma project. This command sets up the basic directory structure, creates a `schema.prisma` file, and installs the necessary dependencies.
    * Example: `npx prisma init --datasource-provider postgresql` (specifies the database provider)

## Schema Management

* **`prisma introspect`**: Introspects an existing database and generates a Prisma schema based on its structure. Useful for working with pre-existing databases.
    * Example: `npx prisma introspect`
* **`prisma generate`**: Generates Prisma Client and other artifacts based on the `schema.prisma` file. Necessary after schema modifications.
    * Example: `npx prisma generate`
* **`prisma format`**: Formats the `schema.prisma` file to adhere to Prisma's style conventions.
    * Example: `npx prisma format`
* **`prisma validate`**: Validates the `schema.prisma` file for syntax and semantic errors.
    * Example: `npx prisma validate`
* **`prisma db pull`**: Introspects the database and updates the Prisma schema accordingly, similar to `prisma introspect` but intended for use within a workflow where migrations are also used.
    * Example: `npx prisma db pull`

## Migrations

* **`prisma migrate dev`**: Creates and applies a new migration based on changes in the `schema.prisma` file. It's an interactive command that prompts for a migration name.
    * Example: `npx prisma migrate dev --name "add user table"`
* **`prisma migrate deploy`**: Applies pending migrations to the database. Typically used in production environments.
    * Example: `npx prisma migrate deploy`
* **`prisma migrate reset`**: Resets the database and applies all migrations from scratch. Useful for development and testing.
    * Example: `npx prisma migrate reset`
* **`prisma migrate status`**: Displays the status of migrations (applied, pending).
    * Example: `npx prisma migrate status`
* **`prisma migrate resolve`**: Manually marks migrations as applied or rolled back. Useful for resolving conflicts or issues.
    * Example: `npx prisma migrate resolve --applied 20230101000000_initial_migration`
* **`prisma migrate diff`**: Show the difference between your schema and the database.
    * Example: `npx prisma migrate diff`

## Prisma Studio

* **`prisma studio`**: Opens Prisma Studio, a visual database management tool, in your browser.
    * Example: `npx prisma studio`

## Prisma Client

* **`prisma generate --watch`**: Generates Prisma Client and watches for changes in the `schema.prisma` file, automatically regenerating on save. Useful during development.
    * Example: `npx prisma generate --watch`

## Database Management (Advanced)

* **`prisma db push`**: Synchronizes the database schema with the Prisma schema without generating migrations. This is a destructive operation and should be used with caution, primarily for rapid prototyping or small changes.
    * Example: `npx prisma db push`
* **`prisma db seed`**: Runs a seed script to populate the database with initial data. Requires a `prisma/seed.js` or `prisma/seed.ts` file.
    * Example: `npx prisma db seed`

## Troubleshooting and Information

* **`prisma version`**: Displays the installed Prisma CLI and engine versions.
    * Example: `npx prisma version`
* **`prisma --help`**: Displays the Prisma CLI help menu.
    * Example: `npx prisma --help`
* **`prisma migrate diff --from-schema ./schema.prisma --to-url "postgresql://user:password@host:port/dbname"`**: Compares a schema file to a database URL.
    * Example: as shown.
* **`prisma db execute`**: Executes raw SQL queries against the database.
    * Example: `npx prisma db execute --stdin` (then type your sql and press ctrl + d)

## Environment Variables

Ensure your database connection string is set in the `.env` file as `DATABASE_URL`. For example: