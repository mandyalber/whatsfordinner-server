const express = require('express')
const searchRecipesRouter = express.Router()
const SearchRecipeService = require('./search-recipes-service')

searchRecipesRouter
    .route('/')
    .get(SearchRecipeService.getRecipes)

module.exports = searchRecipesRouter