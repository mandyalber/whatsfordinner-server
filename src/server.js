const app = require('./app')
const knex = require('knex')
const { PORT, DATABASE_URL } = require('./config')

const db = knex({
  client: 'pg',
  connection: {
    host : 'ec2-34-200-181-5.compute-1.amazonaws.com',
    user: 'xzchewmhnclbtq',
    database : 'ddao5iptqkfu82',
    password : '0a2dd6e6f681a38ef49044068895da537a586d71d883c446cf678cef7d24a9d4',
    port : '5432',
    ssl: true
  }
})
app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
}) 
