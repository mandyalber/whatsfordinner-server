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

--- AFTER CONSOLE LOGS DEPLOY ---

Search URL https://api.spoonacular.com/recipes/complexSearch?apiKey=undefined&cuisine=african&diet=&intolerances=&includeIngredients=&excludeIngredients=&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true
2020-12-17T22:42:05.495692+00:00 app[web.1]: Search response Response {
2020-12-17T22:42:05.495709+00:00 app[web.1]: size: 0,
2020-12-17T22:42:05.495709+00:00 app[web.1]: timeout: 0,
2020-12-17T22:42:05.495710+00:00 app[web.1]: [Symbol(Body internals)]: {
2020-12-17T22:42:05.495710+00:00 app[web.1]: body: Gunzip {
2020-12-17T22:42:05.495711+00:00 app[web.1]: _writeState: [Uint32Array],
2020-12-17T22:42:05.495712+00:00 app[web.1]: _readableState: [ReadableState],
2020-12-17T22:42:05.495713+00:00 app[web.1]: readable: true,
2020-12-17T22:42:05.495713+00:00 app[web.1]: _events: [Object: null prototype],
2020-12-17T22:42:05.495714+00:00 app[web.1]: _eventsCount: 6,
2020-12-17T22:42:05.495714+00:00 app[web.1]: _maxListeners: undefined,
2020-12-17T22:42:05.495714+00:00 app[web.1]: _writableState: [WritableState],
2020-12-17T22:42:05.495715+00:00 app[web.1]: writable: false,
2020-12-17T22:42:05.495715+00:00 app[web.1]: allowHalfOpen: true,
2020-12-17T22:42:05.495715+00:00 app[web.1]: _transformState: [Object],
2020-12-17T22:42:05.495716+00:00 app[web.1]: _hadError: false,
2020-12-17T22:42:05.495716+00:00 app[web.1]: bytesWritten: 0,
2020-12-17T22:42:05.495717+00:00 app[web.1]: _handle: [Zlib],
2020-12-17T22:42:05.495721+00:00 app[web.1]: _outBuffer: <Buffer 7b 22 73 74 61 74 75 73 22 3a 22 66 61 69 6c 75 72 65 22 2c 20 22 63 6f 64 65 22 3a 34 30 31 2c 22 6d 65 73 73 61 67 65 22 3a 22 59 6f 75 20 61 72 65 ... 16334 more bytes>,
2020-12-17T22:42:05.495721+00:00 app[web.1]: _outOffset: 0,
2020-12-17T22:42:05.495722+00:00 app[web.1]: _chunkSize: 16384,
2020-12-17T22:42:05.495722+00:00 app[web.1]: _defaultFlushFlag: 2,
2020-12-17T22:42:05.495722+00:00 app[web.1]: _finishFlushFlag: 2,
2020-12-17T22:42:05.495723+00:00 app[web.1]: _defaultFullFlushFlag: 3,
2020-12-17T22:42:05.495723+00:00 app[web.1]: _info: undefined,
2020-12-17T22:42:05.495724+00:00 app[web.1]: _maxOutputLength: 2147483647,
2020-12-17T22:42:05.495724+00:00 app[web.1]: _level: -1,
2020-12-17T22:42:05.495724+00:00 app[web.1]: _strategy: 0,
2020-12-17T22:42:05.495725+00:00 app[web.1]: [Symbol(kCapture)]: false
2020-12-17T22:42:05.495725+00:00 app[web.1]: },
2020-12-17T22:42:05.495725+00:00 app[web.1]: disturbed: false,
2020-12-17T22:42:05.495726+00:00 app[web.1]: error: null
2020-12-17T22:42:05.495726+00:00 app[web.1]: },
2020-12-17T22:42:05.495727+00:00 app[web.1]: [Symbol(Response internals)]: {
2020-12-17T22:42:05.495727+00:00 app[web.1]: url: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=undefined&cuisine=african&diet=&intolerances=&includeIngredients=&excludeIngredients=&instructionsRequired=true&addRecipeInformation=true&addRecipeNutrition=true&limitLicense=true',
2020-12-17T22:42:05.495728+00:00 app[web.1]: status: 401,
2020-12-17T22:42:05.495728+00:00 app[web.1]: statusText: 'Unauthorized',
2020-12-17T22:42:05.495729+00:00 app[web.1]: headers: Headers { [Symbol(map)]: [Object: null prototype] },
2020-12-17T22:42:05.495729+00:00 app[web.1]: counter: 0
2020-12-17T22:42:05.495730+00:00 app[web.1]: }
2020-12-17T22:42:05.495730+00:00 app[web.1]: }
2020-12-17T22:42:05.496256+00:00 app[web.1]: Error: 401
2020-12-17T22:42:05.496258+00:00 app[web.1]: at /app/src/search-recipes/search-recipes-service.js:38:21
2020-12-17T22:42:05.496258+00:00 app[web.1]: at processTicksAndRejections (internal/process/task_queues.js:97:5)

*/