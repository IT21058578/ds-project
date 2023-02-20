# Backend

## Setting Up Development Environment

### The Codebase

cd into .../ds-project/codebase/backend
When here, do these commands;

1. `npm i` - This command installs necessary deps for quick setup
2. `npm i-all` - This command installs all deps of all services

A disclaimer regarding this second command. I do not know the reason but my installation usually when I run it. I fixed this issue by copying the node_modules folder between the subdirectories when one had been properly downloaded. And running `npm i` for each directory seperately.

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

You know how

# VCS Guidelines

We will maintain 5 branches at the minimum. These branches will be purpose built as follows;

1.  Main Branch - Branch where fully working versions of the project are kept
2.  Dev Branch - Branch where developer branches are merged and tested to see whether they work as intended
3.  Developer_Name Branches - Individual branches for our changes. There should be 4 of these for 4 members.

Please take special care as to not push breaking changes to the dev branch. Make sure things work in your branch before trying to merge into the dev branch.

# Coding Standards

1. All file names should use hyphen seperated lowercase names. Eg: Auth Controller.ts -> auth-controller.ts
2. Do not sub-divide src directory unless necessary. Most services might only have one set of routes, controllers and services which makes dividing it unnecessary.
3. Prefer writing interfaces over types unless absolutely necessary. All interfaces must be prefixed with I- eg; ITokenFamily
4. Import order should be

   1. Express or React imports
   2. 3rd Party Library Imports
   3. Our custom stuff
   4. Constants and Types
   5. Styles if any

5. All environment variables should be first imported to constants.ts then exported from there.
6. constants.ts should maintain the full list of global constants used in the entire microservice architecture
7. All endpoint urls should be lowercase, hyphen seperated.
