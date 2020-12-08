CREATE TABLE saved_recipes (
    "recipeId" INTEGER PRIMARY KEY,
    "title" TEXT NOT NULL,
    "sourceUrl" VARCHAR(2048),
    "image" VARCHAR(2048),
    "summary" TEXT NOT NULL
);

