const SavedRecipeService = {
    getAllRecipes(knex) {
        return knex.select('*').from('saved_recipes')
    },
    insertRecipe(knex, newRecipe) {
        return knex.insert(newRecipe).into('saved_recipes').returning('*').then(rows => { return rows[0] })
    },
    getRecipesByUserId(knex, userId) {
        return knex.from('saved_recipes').select('*').where('userId', userId)
    },
    deleteRecipeById(knex, userId, recipeId) {
        return knex.from('saved_recipes').where({ userId }).and.where({ recipeId }).delete()
    },
    hasRecipeWithUserId(db, userId, recipeId) {
        return db('saved_recipes').where({ userId }).and.where({ recipeId }).first().then(recipe => !!recipe)
    },
}

module.exports = SavedRecipeService