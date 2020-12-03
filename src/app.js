require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { CLIENT_ORIGIN, NODE_ENV } = require('./config')
const recipeList = require('./store.json')

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())

<<<<<<< HEAD
var corsOptions = {
  origin: 'https://whatsfordinner-app.vercel.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
=======
app.use(cors());
>>>>>>> parent of 67cbd84... updated CORS header
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

app.get('/api/recipes', function handleGetRecipes(req, res) {
  let response = recipeList
   res.json(response)
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