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
    const filters = [diet, intolerances, cuisine, includeIngredients, excludeIngredients]

    console.log('Search URL', url);

    fetch(url)
        .then(response => {
            console.log('Search response', response);
            if (!response.ok) {
              throw new Error(response.status)
            }
            return response.json()
        })
        .then(recipes => 
          res.json({recipes: recipes.results, filters: filters})
          )
        .catch(error => console.log(error))
  }, 
}

module.exports = SearchRecipeService

/*

2020-12-17T22:09:44.919417+00:00 heroku[router]: at=error code=H12 desc="Request timeout" method=GET path="/api/search-recipes?cuisine=african&diet=&intolerances=&includeIngredients=&excludeIngredients=" host=infinite-bayou-90165.herokuapp.com request_id=8dd968b4-2450-41c9-8f32-7a0604f92ad7 fwd="64.18.9.208" dyno=web.1 connect=1ms service=30000ms status=503 bytes=0 protocol=https

2020-12-17T22:09:44.919857+00:00 app[web.1]: GET /api/search-recipes?cuisine=african&diet=&intolerances=&includeIngredients=&excludeIngredients= - - - - ms

2020-12-17T22:18:12.517498+00:00 app[web.1]: 

2020-12-17T22:18:12.518752+00:00 app[web.1]: GET /api/search-recipes?cuisine=african 401 32 - 1.099 ms

2020-12-17T22:18:12.520996+00:00 heroku[router]: at=info method=GET path="/api/search-recipes?cuisine=african" host=infinite-bayou-90165.herokuapp.com request_id=1e28cb80-771f-4712-9754-7ee577409e19 fwd="64.18.9.197" dyno=web.1 connect=1ms service=3ms status=401 bytes=838 protocol=https

2020-12-17T22:21:40.501589+00:00 app[web.1]: Error: 401

2020-12-17T22:21:40.501607+00:00 app[web.1]:     at /app/src/search-recipes/search-recipes-service.js:35:23

2020-12-17T22:21:40.501609+00:00 app[web.1]:     at processTicksAndRejections (internal/process/task_queues.js:97:5)

2020-12-17T22:22:10.317651+00:00 app[web.1]: GET /api/search-recipes?cuisine=african - - - - ms

2020-12-17T22:22:10.317838+00:00 heroku[router]: at=error 
code=H12
desc="Request timeout"
method=GET
path="/api/search-recipes?cuisine=african"
host=infinite-bayou-90165.herokuapp.com
request_id=05affed3-1c7f-4650-ac47-3a3e370f994a
fwd="64.18.9.201"
dyno=web.1
connect=0ms
service=30000ms
status=503
bytes=0
protocol=https

*/