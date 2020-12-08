require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { CLIENT_ORIGIN, NODE_ENV, API_ENDPOINT, API_KEY } = require('./config')
const spoonacular = require('./spoonacular.json')
const fetch = require("node-fetch")
const savedRecipesRouter = require('./saved-recipes/saved-recipes-router')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.use(cors());
/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", 'https://whatsfordinner-app.vercel.app/');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});*/


app.use('/api/saved-recipes', savedRecipesRouter)
/*
app.get('/api/saved-recipes', function handleGetRecipes(req, res) {
  let response = spoonacular.results
  res.json(response)
})*/

app.get('/api/', (req, res) => {
  res.send('Hello World!')
})


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

app.get('/api/search-recipes', function handleFetchRecipes(req, res) {
  console.log(req.query)
  const { cuisine, diet, intolerances, includeIngredients, excludeIngredients } = req.query
  const params = {
    apiKey: API_KEY,
    cuisine: cuisine,
    diet: diet,
    intolerances: intolerances,
    includeIngredients: includeIngredients,
    excludeIngredients: excludeIngredients,   
    instructionsRequired: 'true',
    addRecipeInformation: 'true',
    addRecipeNutrition: 'true',
    limitLicense: 'true'    
  }
  
  const queryString = formatQueryParams(params)
  const url = API_ENDPOINT + queryString
  
  console.log(url)
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      }
      return response.json()
    })
    .then(recipes => res.json(recipes.results))
    .catch(error => console.log(error))  
})




app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app

/*server updates
have a controller that handles function, then service to implement fetch calls

options for saving recipes:
  store only ID and title, have button for user to fetch full recipe info display
  do a batch call of IDs (ask spoonacular if this is possible)
  store in database with json datatype column (see if allowed in postgres)

use JS function to select * from saved table and get random 7 without duplicates (if less than 7, what to do? maybe display suggested recipes from something common to saved)
*/