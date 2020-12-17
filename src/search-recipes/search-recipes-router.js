const express = require('express')
const cors = require('cors')
const { requireAuth } = require('../auth/jwt-auth')
const searchRecipesRouter = express.Router()
const SearchRecipeService = require('./search-recipes-service')

app.use(cors());

searchRecipesRouter
    .route('/')
    .get(requireAuth, SearchRecipeService.getRecipes)

module.exports = searchRecipesRouter