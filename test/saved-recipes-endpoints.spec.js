const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Saved Recipes Endpoints', function () {
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

    describe.only(`GET /api/saved-recipes`, () => {
        context(`Given no recipes for user`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(db, testUsers)
            )
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/saved-recipes')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, [])
            })
        })


        context('Given there are recipes in the database', () => {
            beforeEach('insert recipes', () =>
                helpers.seedRecipesTables(db, testUsers, testRecipes)
            )

            it('responds with 200 and all of the users recipes', () => {
                const expectedRecipes = helpers.getExpectedRecipes(testUsers[0], testRecipes)

                return supertest(app)
                    .get('/api/saved-recipes')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, expectedRecipes)
            })
        })
    })

    describe(`POST /api/saved-recipes`, () => {
        beforeEach('insert recipes', () =>
            helpers.seedRecipesTables(db, testUsers, testRecipes)
        )
        context('Recipe does not exist in DB', () => {
            it('Reponds 201, Saved! and inserts recipe in the database', () => {
                const newRecipe = {
                    userId: 2,
                    recipeId: 1,
                    title: 'test recipe',
                    sourceUrl: 'http://test.com',
                    image: 'http://test.com',
                    summary: 'test recipe summary'
                }
                return supertest(app)
                    .post('/api/saved-recipes')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
                    .send(newRecipe)
                    .expect(201, { "message": "Saved to your dashboard!" })
                    .expect(res =>
                        db
                            .from('saved_recipes')
                            .select('*')
                            .where({ userId: 2 })
                            .first()
                            .then(row => {
                                expect(row.userId).to.eql(newRecipe.userId)
                                expect(row.recipeId).to.eql(newRecipe.recipeId)
                                expect(row.title).to.eql(newRecipe.title)
                                expect(row.sourceUrl).to.eql(newRecipe.sourceUrl)
                                expect(row.image).to.eql(newRecipe.image)
                                expect(row.summary).to.eql(newRecipe.summary)
                            })


                    )
            })
        })
        context('Recipe already exists in DB', () => {
            it(`Reponds 400, You've already saved this recipe.`, () => {
                const newRecipe = testRecipes[0]
                return supertest(app)
                    .post('/api/saved-recipes')
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .send(newRecipe)
                    .expect(400, { error: `You've already saved this recipe.` })
            })
        })
    })

    describe(`DELETE /api/saved-recipes/:recipeId`, () => {
        beforeEach('insert recipes', () =>
            helpers.seedRecipesTables(db, testUsers, testRecipes)            
        )
        it('should respond 204 and delete the recipe', () => {
            return db('saved_recipes').first().then(recipe => {
                return supertest(app)
                    .delete(`/api/saved-recipes/${recipe.recipeId}`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(204)
            })
        })
    })

    describe(`GET /api/weekdays`, () => {
        context(`Given no saved recipes`, () => {
            beforeEach(() =>
                helpers.seedUsers(db, testUsers)
            )

            it(`responds with array of 7 default recipes`, () => {
                const defaultRecipes = helpers.recipesDefault

                return supertest(app)
                    .get(`/api/saved-recipes/weekdays`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, defaultRecipes)
            })
        })

        context('Given there are recipes in the database', () => {
            beforeEach('insert recipes', () =>
                helpers.seedRecipesTables(db, testUsers, testRecipes)
            )

            it('responds with 200 and 7 random recipes', () => {
                const unRandomRecipes = helpers.getExpectedRecipes(testUsers[0], testRecipes)
                const expectedRecipes = helpers.getRandomRecipes(unRandomRecipes)

                return supertest(app)
                    .get(`/api/saved-recipes/weekdays`)
                    .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                    .expect(200)
                    .expect(res => {
                        expect(res.body).to.have.length(7)
                        expect(res.body[0]).to.not.eql(expectedRecipes[0])
                    })

            })
        })
    })

})