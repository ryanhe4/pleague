import express from 'express'
import { searchSummoner, searchSchools, sendValidatemail, checkValidationCode } from './auth.ctrl'

const authRoute = express.Router()

authRoute.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send('auth')
  }
)
authRoute.get('/search/summoner/:username', searchSummoner)
authRoute.get('/search/school/:school', searchSchools)
authRoute.post('/sendmail', sendValidatemail)
authRoute.post('/checkcode', checkValidationCode)

export default authRoute
