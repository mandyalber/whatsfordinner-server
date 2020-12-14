//Write routers to perform CRUD operations for Folders.
const express = require('express')
const SavedRecipesService = require('./saved-recipes-service')
const { requireAuth } = require('../auth/jwt-auth')

const savedRecipesRouter = express.Router()
const jsonParser = express.json()

const recipeDefault = { "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" }

function getRandomArray(array) {
    let newArray = [];
    const len = array.length

    if (len < 7) {
        for (let i = 0; i < 7 - len; i++) {
            array.push(recipeDefault)
        }
    }
    for (let i = 0; i < 7; i++) {
        let idx = Math.floor(Math.random() * array.length)
        newArray.push(array[idx])
        array.splice(idx, 1)
    }
    return newArray
}

savedRecipesRouter
    .route('/')
    .all(requireAuth)/*
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        SavedRecipesService.getAllRecipes(knexInstance)
            .then(recipes => {
                res.json(recipes)
            })
            .catch(next)
    })*/
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        console.log(req)
        SavedRecipesService.getRecipesByUserId(knexInstance, req.user.id)
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