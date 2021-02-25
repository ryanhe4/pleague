import express from 'express'
import {
  searchSummoner,
  searchSchools,
  sendValidatemail,
  checkValidationCode,
  register,
  dbTest,
  login, checkLogin, logout
} from './auth.ctrl'
import { isLoggedIn, isNotLoggedIn } from '../../../middleware/jwt'

const authRoute = express.Router()

authRoute.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('auth')
  }
)
authRoute.get('/search/summoner/:username', searchSummoner)
authRoute.get('/search/school/:school', searchSchools)
authRoute.post('/sendmail', sendValidatemail)
authRoute.post('/checkcode', checkValidationCode)
authRoute.post('/register', isNotLoggedIn, register)
authRoute.get('/test', isLoggedIn, dbTest)
authRoute.post('/login', isNotLoggedIn, login)
authRoute.get('/check', isLoggedIn, checkLogin)
authRoute.get('/logout', isLoggedIn, logout)
export default authRoute
