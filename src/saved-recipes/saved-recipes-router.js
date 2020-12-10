//Write routers to perform CRUD operations for Folders.
const express = require('express')
const SavedRecipesService = require('./saved-recipes-service')

const savedRecipesRouter = express.Router()
const jsonParser = express.json()

function getRandomArray(array) {
    let newArray = [];

    for (let i = 0; i < 7; i++) {
        let idx = Math.floor(Math.random() * array.length)
        newArray.push(array[idx])
        array.splice(idx, 1)
    }
    return newArray
}

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

savedRecipesRouter
    .route('/weekdays')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        SavedRecipesService.getAllRecipes(knexInstance)
            .then(recipes => {
                res.json(getRandomArray(recipes))
            })
            .catch(next)
    })

module.exports = savedRecipesRouter