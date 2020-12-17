module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://whatsfordinner-app.vercel.app/',
    API_ENDPOINT: process.env.API_ENDPOINT || 'https://api.spoonacular.com/recipes/complexSearch?',
    API_KEY: process.env.API_KEY,
    DATABASE_URL: process.env.DB_URL || "postgres://rmeaeyrvrliqti:dc0d40fe384e34cdba94b7830027a3ac47cd6b3df2a84fa3b52404c754e0d4a0/d51ehljf4bhffj",
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
  }
  d51ehljf4bhffj