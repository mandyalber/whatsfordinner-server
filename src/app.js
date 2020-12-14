require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { CLIENT_ORIGIN, NODE_ENV } = require('./config')
const savedRecipesRouter = require('./saved-recipes/saved-recipes-router')
const searchRecipesRouter = require('./search-recipes/search-recipes-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.use(cors());

app.use('/api/saved-recipes', savedRecipesRouter)
app.use('/api/search-recipes', searchRecipesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
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