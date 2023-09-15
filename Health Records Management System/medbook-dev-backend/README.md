# Medbook Backend

# Getting started

## Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/9.x)


Clone the repository

    git clone https://github.com/KiarieLinus/MediBook.git

Switch to the repo folder

    cd medbook-dev-backend

Install all the dependencies using composer

    composer install

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000
    
**Make sure you set the correct database connection information before running the migrations**

    php artisan migrate
    php artisan serve

## Database seeding

**Populate the database with seed data with relationships which includes patients with associated genders and services. This can help you to quickly start testing the api or couple a frontend and start using it with ready content.**

Open the [seeders](https://github.com/KiarieLinus/MediBook/tree/main/Health%20Records%20Management%20System/medbook-dev-backend/database/seeders) and set the property values as per your requirement

Run the database seeder and you're done

    php artisan db:seed

***Note*** : It's recommended to have a clean database before seeding. You can refresh your migrations at any point to clean the database by running the following command

    php artisan migrate:refresh
    
## API Endpoints

- GET /api/patients: Get all patients.
- POST /api/patients: Create a new patient with associated gender and service.
- PUT /api/patients/{patientId}: Update patient details.

## Environment variables

- `.env` - Environment variables can be set in this file
