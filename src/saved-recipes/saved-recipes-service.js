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
}

module.exports = SavedRecipeService