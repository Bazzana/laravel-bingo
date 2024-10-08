## First steps
After cloning the repo, run the following commands from inside the root of the project

`touch ./database/database.sqlite` 
  - Create a sqlite file

`npm i`
  - install required packages from NPM

`composer install--ignore-platform-reqs`
  - install required packages from Composer, ignore platform reqs may be required due to php mismatch errors on some dependencies

## Adjustments required to .env
`DB_CONNECTION=sqlite` 
  - Point our laravel config to our previously created sqlite file in step 1

Comment out the rest of the DB_* variables, all that should be required here is the DB_CONNECTION

## Run database migrations
`php artisan migrate`
  - Run migrations, this will create the required Scores table

## Build production assets
`npm run production`
  - This will run the build script using Mix, compiling all assets to a production ready state.

## Serve the site and play Bingo
 `php artisan serve`
  - This step may differ depending on how you've configured your local development environment (for instance, if you're using vagrant with Laravel Homestead).
