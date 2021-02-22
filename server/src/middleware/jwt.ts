import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '../entity/User'
import { NextFunction, Request, Response } from 'express'

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
      if (user) return done(null, user)
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
    if(error) {
      res.status(401).send('잘못된 접근(NOT authenticate)')
    }
    if (user) {
      req.user = user
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
