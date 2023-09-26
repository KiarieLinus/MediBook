# Medbook Backend

# Getting started

## Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/7.x/installation).

Switch to the repo folder

    cd medbook-dev-backend

Install all the dependencies using composer

    composer install

Copy the .env.example file and make the required configuration changes in your .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Run the database migrations (**Set the database connection in [.env](#environment-variables) before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000

**Make sure you set the correct database connection information before running the migrations**

    php artisan migrate
    php artisan serve

## Database seeding

**Populate the database with seed data for patients, genders and services. This can help you to quickly start testing the api or couple a frontend and start using it with ready content.**

Open the seeders located at
`/medbook-dev-backend/database/seeders` and set the property values as per your requirements.

Run the database seeder and you're done

    php artisan db:seed

**_Note_** : It's recommended to have a clean database before seeding. You can refresh your migrations at any point to clean the database by running the following command

    php artisan migrate:refresh

## API Endpoints

-   GET /api/patients: Get all patients.
-   GET /api/genders: Get all genders.
-   GET /api/services: Get all types of services.
-   GET /api/patients/{patient}: Get single patient.
-   POST /api/patients: Create a new patient with associated gender and service.
-   PUT /api/patients/{patient}: Update patient details.

## Environment variables

-   `.env` - Environment variables can be set in this file
