BEGIN;

TRUNCATE
  saved_recipes
  RESTART IDENTITY CASCADE;

INSERT INTO saved_recipes ("userId","recipeId", "title", "sourceUrl", "image", "summary")
VALUES
    (1,782601, 'User 1 first recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (2,782603, 'User 2 first recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (3,782605, 'User 3 first recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (1,782608, 'User 1 second recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (2,788601, 'User 2 second recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (3,785501, 'User 3 second recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (1,755601, 'User 1 third recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (2,785551, 'User 2 third recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​'),
    (3,785421, 'User 3 third recipe', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​');

COMMIT;




