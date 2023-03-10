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

### Fix for starting error

Remove top level awaits from index.ts by changing its structure.
In tsconfig set module to commonjs and target to es6.
Remove types=module from package.json

### The Containers

All the individual services have identical Dockerfiles in their directories. You can build them individually if required. I advise to build the docker-compose.yml in the codebase directory though as that will give you all the containerized databases and other services. While in this directory, do,

`docker-compose up --build`

After that you can manage this using docker desktop. It will build and start the services as well, but you can disable those. Just active the 3 required containers (Mongo, Redis, RabbitMQ) when working.

## Maintaining the Tooling

Please make sure to modify the corresponding commands in the backend package.json aswell as the docker-compose.yml as new services are added or as services are removed. Otherwise it may cause issues.

If a new service is to be added. Please make a copy of the .template folder in this directory and edit the required configurations in the directory package.json and .env file

# Frontend

## Setting Up Development Environment

## Technologies Used

This section serves as brief, yet thorough documentation on the key libraries we use in the frontend that needs mentioning along with how we intend to use it.

### Redux, Redux Toolkit and Redux Toolkit Query

These 3 combine to form our state management and data fetching solution in the frontend. We have a single api defined using the `createApi()` function in src/store/base-api.ts . This is the only slice that exists for dealing with our backend. We extend this api slice for our specific needs by making a xxx-api-slice.ts file and using the `injectEndpoints()` function to extend it. This is in accordance with the method mentioned here https://redux-toolkit.js.org/rtk-query/usage/code-splitting for code-splitting.

We are not making use of the `baseQuery` variable and instead importing and injecting the url from the environment variables in the speciic api-slice.ts files. This is because our microservice architecture in the backend makes it so that each API has a different port

Further we are also declaring a map in each of these files for the collection of endpoints. We reference this when writing our apiSlices. This helps keep the code a bit cleaner and concise.

## Handling Certain Errors

### 504 Gateway Error

- Go into node_modules and delete the .vite folder

# VCS Guidelines

We will maintain 5 branches at the minimum. These branches will be purpose built as follows;

1.  Main Branch - Branch where fully working versions of the project are kept
2.  Dev Branch - Branch where developer branches are merged and tested to see whether they work as intended
3.  Developer_Name Branches - Individual branches for our changes. There should be 4 of these for 4 members.

Please take special care as to not push breaking changes to the dev branch. Make sure things work in your branch before trying to merge into the dev branch.

# Coding Standards

## Backend

1. All file names should use hyphen seperated lowercase names. Eg: Auth Controller.ts -> auth-controller.ts
2. Do not sub-divide src directory unless necessary. Most services might only have one set of routes, controllers and services which makes dividing it unnecessary. The following are the directories that can be named with their purpose
   - middleware - These are middleware functions that run on specific routes, routers or the app as a whole. Preferrably each function should have its own file
   - routes - These are solely for defining api endpoints and the order in which data is processed. Data validation, authentication and etc happen here
   - controllers - These are responsible for returning errors if data validation has failed or if the service function fails
   - services - These are nested inside their specific controller function. Take in some data and perform business logic
   - models - These are for managing database objects
3. Prefer writing interfaces over types unless absolutely necessary. All interfaces must be prefixed with I- eg; ITokenFamily
4. Import order should be

   1. Express or React imports
   2. 3rd Party Library Imports
   3. Our custom stuff
   4. Constants and Types
   5. Styles if any

5. The purposes of the other basic files are as follows
   - constants.ts - For maintaing all constants across our entire system. All .env variables should be imported into constants.ts and exported from it for use in the app
   - utils.ts - For maintaining all minor utility functions that cannot be placed anywhere else in the hierarchy
   - types.ts - For maintaining track of all types, interfaces, enums and etc that are used in the entire system
   - index.ts - Entry point for each specific service
6. All endpoint urls should be lowercase, hyphen seperated.
7. All filenames should be lowercase, hyphen seperated

## Frontend

1. Function and variable names should be clear, concise and understandable.
2. Only a single component should be exported per .tsx file. This should be the default export
   - Break down large components into smaller components always. Use a combination of the DRY and KISS principles. i.e ; Write the code first, then identify the repetitions and refactor the code to minimize repetition.
   - If a broken down component is only used within a single component, basically if a component has to be local. Make another component function in the same file, just don't export it. ( Check BuyerNavBar.tsx for an example )
   - Following the above rule, if the broken down components exceed 3. Or if the file length becomes really large, prefer making entirely seperate files for it. Have these new .tsx files in a folder with the name as same as the component it belongs to. i.e BuyerLayout.tsx has two exclusive sub-components BuyerFooter and BuyerNavBar. These two files are moved to the BuyerLayour folder which exists in the same directory as BuyerLayout.tsx.
