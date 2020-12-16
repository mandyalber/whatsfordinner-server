const express = require('express')
const { requireAuth } = require('../auth/jwt-auth')
const searchRecipesRouter = express.Router()
const SearchRecipeService = require('./search-recipes-service')

searchRecipesRouter
    .route('/')
    .get(requireAuth, SearchRecipeService.getRecipes)

module.exports = searchRecipesRouter