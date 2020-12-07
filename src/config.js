module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://whatsfordinner-app.vercel.app/',
    API_ENDPOINT: process.env.API_ENDPOINT || 'https://api.spoonacular.com/recipes/complexSearch?',
    API_KEY: process.env.API_KEY
  }