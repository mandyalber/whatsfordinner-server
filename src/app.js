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

app.use(cors(/*{
  origin: CLIENT_ORIGIN
  }*/
));

app.use('/api/saved-recipes', savedRecipesRouter)
app.use('/api/search-recipes', searchRecipesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.get('/', (req, res) => {
  res.send(`Backend application for What's for Dinner Client located @ whatsfordinner-app.vercel.app`)
})

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