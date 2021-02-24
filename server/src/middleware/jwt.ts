import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { User } from '../entity/User'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const cookieExtractor = (req: Request) => {
  let jwt = null
  if (req?.cookies) {
    jwt = req.cookies['access_token']
  }
  return jwt
}

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET
}

export default () => {
  passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findbyEmail(jwt_payload.email)
      const data = {
        user: user,
        exp: jwt_payload.exp
      }
      if (user) return done(null, data)
      else return done(null, false)
    } catch (e) {
      console.error(e)
      return done(e, false)
    }
  }))

  passport.initialize()
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error) {
      res.status(401).send('잘못된 접근(NOT authenticate)')
    }
    if (user) {
      try {
        req.user = user.user

        const now = Math.floor(Date.now() / 1000)
        if (user.exp - now < 60 * 60 * 24 * 3.5) {
          const token = user.user.generateToken()
          res.cookie('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true
          })
        }
      } catch (e) {
        return next()
      }

    }
    next()
  })(req, res, next)
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다.')
  }
  next()
}

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.status(401).send('로그인 상태에서는 접근할 수 없습니다.')
  }
  next()
}
