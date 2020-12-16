const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 1,
            email: 'email1@email.com',
            display_name: 'Test user 1',
            password: 'password',
        },
        {
            id: 2,
            email: 'email2@email.com',
            display_name: 'Test user 2',
            password: 'password',
        },
        {
            id: 3,
            email: 'email3@email.com',
            display_name: 'Test user 3',
            password: 'password',
        },
        {
            id: 4,
            email: 'email4@email.com',
            display_name: 'Test user 4',
            password: 'password',
        },
    ]
}

function makeRecipesArray(users) {
    return [
        {
            userId: 1,
            recipeId: 782601,
            title: 'User 1 first recipe',
            sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',
            image: ' https://spoonacular.com/recipeImages/782601-312x231.jpg',
            summary: 'test​​'
        },
        {
            userId: 1,
            recipeId: 782602,
            title: 'User 2 first recipe',
            sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',
            image: ' https://spoonacular.com/recipeImages/782601-312x231.jpg',
            summary: 'test​​'
        },
        {
            userId: 1,
            recipeId: 782603,
            title: 'User 3 first recipe',
            sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',
            image: ' https://spoonacular.com/recipeImages/782601-312x231.jpg',
            summary: 'test​​'
        },
        {
            userId: 1,
            recipeId: 782604,
            title: 'User 4 first recipe',
            sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',
            image: ' https://spoonacular.com/recipeImages/782601-312x231.jpg',
            summary: 'test​​'
        },
        {
            userId: 1,
            recipeId: 782605,
            title: 'User 4 first recipe',
            sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',
            image: ' https://spoonacular.com/recipeImages/782601-312x231.jpg',
            summary: 'test​​'
        },
        {
            userId: 1,
            recipeId: 782606,
            title: 'User 4 first recipe',
            sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',
            image: ' https://spoonacular.com/recipeImages/782601-312x231.jpg',
            summary: 'test​​'
        },
        {
            userId: 1,
            recipeId: 782607,
            title: 'User 4 first recipe',
            sourceUrl: 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',
            image: ' https://spoonacular.com/recipeImages/782601-312x231.jpg',
            summary: 'test​​'
        },
    ]
}

const recipesDefault = [{ "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" },{ "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" },{ "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" },{ "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" },{ "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" },{ "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" },{ "title": "See More Recipes Here", "summary": "Please add at least 7 recipes to your profile in order to see a full week of recipe suggestions" }]

const recipeDefault = recipesDefault[0]

function getExpectedRecipes(user, recipes) {
    return recipes.filter(recipe => user.id === recipe.userId)
}

function getRandomRecipes(array) {
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

function makeRecipesFixtures() {
    const testUsers = makeUsersArray()
    const testRecipes = makeRecipesArray(testUsers)
    return { testUsers, testRecipes }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE saved_recipes, wfd_users`
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE wfd_users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('wfd_users_id_seq', 0)`),
                ])
            )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('wfd_users').insert(preppedUsers)
        .then(() =>
            db.raw(`SELECT setval('wfd_users_id_seq', ?)`, [users[users.length - 1].id])
        )
}

function seedRecipesTables(db, users, recipes = []) {
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('saved_recipes').insert(recipes)
    })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.email,
        algorithm: 'HS256',
    })
    return `bearer ${token}`
}

module.exports = {
    makeUsersArray,
    makeRecipesArray,
    getExpectedRecipes,
    getRandomRecipes,
    makeRecipesFixtures,
    recipesDefault,
    recipesDefault,
    cleanTables,
    makeAuthHeader,
    seedUsers,
    seedRecipesTables
}