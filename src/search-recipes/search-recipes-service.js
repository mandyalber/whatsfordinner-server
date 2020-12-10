const fetch = require("node-fetch")
const { API_ENDPOINT, API_KEY } = require('../config')

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

const SearchRecipeService = {
  getRecipes(req, res, next) {
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

    //console.log(url)

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
            return response.json()
        })
        .then(recipes => res.json(recipes.results))
        .catch(error => console.log(error))
  }, 
}

module.exports = SearchRecipeService