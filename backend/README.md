# PayBaymax FullStack Test

## (Notable) Technologies Used

- Docker & Docker Compose: I used docker and docker-compose to package the app dependencies as an image. So they can be deployed together. What i could have done better in this case is also add the app as a dependency and make it wait for mysql to start.
- Awilix for Dependency Injection: It is a very powerful DI tool that works great for nodejs and is really simple to use.
- Sequelize: This is an ORM that works great with SQL databases. It also has a useful CLI that can be used to seed database, create tables, models and other necessary files to work with SQL databases.
- Mocha and Chai for testing
- Simple Mock for mocking
- EsLint with airbnb linting
- Joi: This is a validation tool that has some rules on how to verify data.
- Make: I used a makefile to help make running some commands easier. For example the command for creating migrations etc. They can be found in makefile.

## Design Overview

The project was generated using express cli generator. I modified the structure to follow a pattern of seperation of responsibilities. The structure is as follows:

- bin - This contains code to initialize and start the server
- config - This contains all configurations for all tools and libraries. e.g. mysql
- migrations - This contains code to create and teardown mysql tables
- models - This contains models to help interract with database tables
- seeders - This contains sample data or data to be pre-loaded into the db.
- src
  - api - Contains code for routes and middlewares
    - helpers - Helpers to help make code more re-usable. I also follow the pattern of coding to interfaces and not implementations, so that when implementations change my code won't break. <a href="https://medium.com/better-programming/code-against-interfaces-not-implementations-37b30e7ab992">https://medium.com/better-programming/code-against-interfaces-not-implementations-37b30e7ab992</a>
    - loaders - Used to a collection of items or anything that needs to be loaded before app starts. e.g. workers, jobs etc.
    - services - Services are where implementations live in. This is where I implement the functionality called from the routes.
    - awilix.js - This file contains my dependency injection definitions.
    - constants.js - This contains constant values.

## Assumptions

- Assuming the users have already been created, so I didn't include a register endpoint. What I did though was to include a seed that can be used to pre-populate the database with user information. The seed contains one employee user and one admin.
- Assigned roles to each user type to be able to implement tokens in future. Through the use of permissions, one can assign duties to other admin type users.
- Assume admin user is pre-created and there is no form for registering such a user.
- Assume the company wishes to create different types of reviews. So I allow them create a review template which is more flexible. As an extension, I can also allow creating validation rules which is checked before rendering a form or storing the data. These templates are what we assign for employees to review.
