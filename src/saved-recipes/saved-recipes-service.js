const SavedRecipeService = {
    getAllRecipes(knex) {
        return knex.select('*').from('saved_recipes')
    },
    insertRecipe(knex, newRecipe) {
        return knex.insert(newRecipe).into('saved_recipes').returning('*').then(rows => { return rows[0] })
    },
    /*getById(knex, recipeId) {
        return knex.from('saved_recipes').select('*').where('recipeId', recipeId).first()
    },*/    
}

module.exports = SavedRecipeService