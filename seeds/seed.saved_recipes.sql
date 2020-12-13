BEGIN;

TRUNCATE
  saved_recipes
  RESTART IDENTITY CASCADE;

INSERT INTO saved_recipes ("userId","recipeId", "title", "sourceUrl", "image", "summary")
VALUES
    (1,782601, 'Red Kidney Bean Jambalaya', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (2,782603, 'Delicious Apple Fritters', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (3,782605, 'Red Kidney Bean Jambalaya', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (1,782608, 'Red Kidney Bean Jambalaya', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (2,788601, 'Red Kidney Bean Jambalaya', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (3,785501, 'Red Kidney Bean Jambalaya', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (1,755601, 'Red Kidney Bean Jambalaya', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'test​​'),
    (2,785551, 'Fake Recipe Super Yum Yums', 'http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html',' https://spoonacular.com/recipeImages/782601-312x231.jpg', 'Summary​​ Summary​​ Summary​​ Summary​​ Summary​​ Summary​​ Summary​​');

COMMIT;




