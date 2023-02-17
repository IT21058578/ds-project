# Backend

## Setting Up Development Environment

### The Codebase

cd into .../ds-project/codebase/backend
When here, do these commands;

1. `npm i` - This command installs necessary deps for quick setup
2. `npm i-all` - This command installs all deps of all services

If you want to start all the services at one for development, do,

`npm d-all`

this starts all the individual services with nodemon. Any services that are changed will auto-restart.

Keep note that this command does not compile the .ts files to .js, just runs them for development purposes. To actually compile to js and run the resulting distributables, do these commands;

1. `npm b-all` - This command builds all the services
2. `npm s-all` - This command starts all the previously built services

### The Containers

All the individual services have identical Dockerfiles in their directories. You can build them individually if required. I advise to build the docker-compose.yml in the codebase directory though as that will give you all the containerized databases and other services. While in this directory, do,

`docker-compose up --build`

After that you can manage this using docker desktop. It will build and start the services as well, but you can disable those. Just active the 3 required containers (Mongo, Redis, RabbitMQ) when working.

## Maintaining the Tooling

Please make sure to modify the corresponding commands in the backend package.json aswell as the docker-compose.yml as new services are added or as services are removed. Otherwise it may cause issues.

If a new service is to be added. Please make a copy of the .template folder in this directory and edit the required configurations in the directory package.json and .env file

# Frontend

# VCS Guidelines

# Coding Standards

1. All file names should use hyphen seperated lowercase names. Eg: Auth Controller.ts -> auth-controller.ts
2. Do not sub-divide src directory unless necessary. Most services might only have one set of routes, controllers and services which makes dividing it unnecessary.
