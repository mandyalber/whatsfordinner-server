const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Searched Recipes Endpoints', function () {
    let db

    const { testUsers, testRecipes } = helpers.makeRecipesFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe(`GET /api/searched-recipes`, () => {
        beforeEach('insert users', () =>
            helpers.seedUsers(db, testUsers)
        )
        context(`Given no search results`, () => {
            const filters = 'cuisine=fakecuisine'
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/search-recipes',filters)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, {
                        "filters": [null,null,null,null,null],
                        "recipes": [],
                    })
            })
        })


        context('Given there are search results', () => {

            it('responds with 200 and recipes object', () => {

                return supertest(app)
                    .get('/api/search-recipes')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200)
            })
        })
    })

})
