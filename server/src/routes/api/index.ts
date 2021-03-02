import express from 'express'
import authRoute from './auth'
import rankRoute from './rank'

const apiRoute = express.Router()
apiRoute.use('/auth', authRoute)
apiRoute.use('/rank', rankRoute)
export default apiRoute
