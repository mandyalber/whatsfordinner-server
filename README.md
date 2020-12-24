# What's For Dinner Server

## Summary
 
This project supplies the endpoints for the What's For Dinner Application located @ whatsfordinner-app.vercel.app, allowing users to search Spoonacular's API for recipes, save them to a database for later retrieval, and generate a random week's worth of recipes.

## Link to Live App

https://infinite-bayou-90165.herokuapp.com/

## Technology Used

Node.js
Express.js
Postgres Database

## Screenshots

#### Landing Page
![Landing Page Screenshot](src/screenshots/landingpage.PNG?raw=true "Landing Page")

#### Create Account
![Create Account Page Screenshot](src/screenshots/createaccount.PNG?raw=true "Create Account Page")

#### User Dashboard
![User Dashboard Page Screenshot](src/screenshots/dashboard.PNG?raw=true "User Dashboard Page")

#### Recipe Search
![Recipe Search Page Screenshot](src/screenshots/search.PNG?raw=true "Recipe Search Page")

## API Documentation

The API is hosted by Heroku and accepts the following requests

##### Saved Recipes

Returns json data about recipes a user has saved.
URL /api/saved-recipes
Method: GET, POST
Params: user.id
Success Response:
  Code: 200, 201
  Content: 
    { userId: 1, recipeId: 777777, title: "Recipe", sourceUrl: "recipe.com", image: "recipeimage.com", summary: "Recipe Summary Description" }
    Error Response:
    Code: 401 UNAUTHORIZED
    Content: { error: 'Missing bearer token' }

##### Weekday Recipes

Returns json data with a random 7 recipes a user has saved.
URL /api/saved-recipes/weekdays
Method: GET
Params: user.id
Success Response: 
  Code: 200
  Content: 
    { userId: 1, recipeId: 777777, title: "Recipe", sourceUrl: "recipe.com", image: "recipeimage.com", summary: "Recipe Summary Description" }
    Error Response:
    Code: 401 UNAUTHORIZED
    Content: { error: 'Missing bearer token' }

##### Search Recipes

Fetches json data from Spoonacular API, and returns json data about recipes to user.
URL /api/search-recipes
Method: GET
Params: user chosen filters as query params
Success Response:
  Code: 200
  Content: 
    { userId: 1, recipeId: 777777, title: "Recipe", sourceUrl: "recipe.com", image: "recipeimage.com", summary: "Recipe Summary Description" }
    Error Response:
    Code: 401 UNAUTHORIZED
    Content: { error: 'Missing bearer token' }

