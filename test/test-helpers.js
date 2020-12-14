const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserWithEmail } = require('../src/auth/auth-service')

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
/*
function makeArticlesArray(users) {
  return [
    {
      id: 1,
      title: 'First test post!',
      style: 'How-to',
      author_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 2,
      title: 'Second test post!',
      style: 'Interview',
      author_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 3,
      title: 'Third test post!',
      style: 'News',
      author_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
    {
      id: 4,
      title: 'Fourth test post!',
      style: 'Listicle',
      author_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
    },
  ]
}*/


/*
function makeArticlesFixtures() {
    const testUsers = makeUsersArray()
    //const testArticles = makeArticlesArray(testUsers)
    return { testUsers, testArticles }
}
*/

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
/*
function seedArticlesTables(db, users, articles, comments = []) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('blogful_articles').insert(articles)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('blogful_articles_id_seq', ?)`,
            [articles[articles.length - 1].id],
        )
        // only insert comments if there are some, also update the sequence counter
        if (comments.length) {
            await trx.into('blogful_comments').insert(comments)
            await trx.raw(
                `SELECT setval('blogful_comments_id_seq', ?)`,
                [comments[comments.length - 1].id],
            )
        }
    })
}

function seedMaliciousArticle(db, user, article) {
    return seedUsers(db, [user])
        .then(() =>
            db
                .into('blogful_articles')
                .insert([article])
        )
}*/

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.email,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

module.exports = {
    makeUsersArray,
    //makeArticlesArray,
    //makeMaliciousArticle,
    //makeArticlesFixtures,
    cleanTables,
    //seedArticlesTables,
    //seedMaliciousArticle,
    makeAuthHeader,
    seedUsers,
}