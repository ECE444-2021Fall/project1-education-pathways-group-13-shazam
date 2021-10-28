# Pathfinder Backend

This is a simple REST API backing our application. Powered by Flask, CockroachDB, and AWS Lambda.

## Directory Structure

#### database

Contains and exports all code relating to database configurations. Also contains schema migrations.

#### models

Contains all data models (`SQLAlchemy` or otherwise) for the backend.

#### routes

Contains all controllers/routers. 

#### utils

Contains utility functions and classes.

## Database Migrations

When you create or modify `SQLAlchemy` models, ensure that you are generating and running a database migration (and committing it to version control). This helps us versionize our database.

NOTE: `flask migrate` will only detect your new model if it has been imported (directly or indirectly) by the main `app.py` file. This usually occurs through importing the `Blueprint` for the set of routes that use the model.

Run these commands in sequence in the base `backend` directory.

1. First generate your migration.

`flask db migrate -m "your migration message"`

2. Double-check the generated migration file in `database/migrations/versions`.
   
3. Apply the migration to the database.

`flask db upgrade`

See the Flask-Migrate [docs](https://flask-migrate.readthedocs.io/en/latest/) for more details.

## Testing and Deployment

AWS Lambda deployments are handled by the [Serverless CLI](https://www.serverless.com/). Once you have the serverless CLI [set up](https://www.serverless.com/framework/docs/getting-started), you will need to install the following plugins:

- `serverless-wsgi`
- `serverless-python-requirements`

You can then deploy to AWS by:

`serverless deploy`

To test locally, run:

`serverless wsgi serve`
