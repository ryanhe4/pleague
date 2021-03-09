import express from 'express'
import { schoolList, summonerList, summonerNoParam } from './rank.ctrl'

const rankRoute = express.Router()

rankRoute.get('/schoolLists', schoolList)
rankRoute.get('/summoners/:schoolName', summonerList)
rankRoute.get('/summoners', summonerNoParam)

export default rankRoute
