//Write routers to perform CRUD operations for Folders.
const express = require('express')
const SavedRecipesService = require('./saved-recipes-service')

const savedRecipesRouter = express.Router()
const jsonParser = express.json()

savedRecipesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        SavedRecipesService.getAllRecipes(knexInstance)
        .then(recipes => {
            res.json(recipes)
        })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { recipeId, title, sourceUrl, image, summary } = req.body
        const newRecipe = { recipeId, title, sourceUrl, image, summary }
        
        SavedRecipesService.insertRecipe(req.app.get('db'), newRecipe)
            .then(recipe => {
                res.status(201).json(recipe) 
                console.log(recipe)
            })
            .catch(next)
    })

module.exports = savedRecipesRouter