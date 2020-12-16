const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { email, password } = req.body
    const loginUser = { email, password }

    for (const [key, value] of Object.entries(loginUser)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }
    }

    AuthService.getUserWithEmail(
      req.app.get('db'),
      loginUser.email
    )
      .then(dbUser => {
        if (!dbUser) {
          return res.status(400).json({
            error: 'Incorrect email or password',
          })
        }
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch) {
              return res.status(400).json({
                error: 'Incorrect email or password',
              })
            }
            const sub = dbUser.email
            const payload = { user_id: dbUser.id }
            /*
            1. Create JWT
            2. Save create token into DB. Either by associating sessions with user id and/or email with valid token.
            3. On each request of verified user authenticate sent token to validate request
            4. Then do request

            On sign out invalidate token so that each subsequent request is invalid by step 3 above.
            */
            res.send({
              authToken: AuthService.createJwt(sub, payload),
              name: dbUser.display_name
            })
          })
      })
      .catch(next)
  })

module.exports = authRouter