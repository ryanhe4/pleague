import express from 'express'
import { schoolList } from './rank.ctrl'

const rankRoute = express.Router()

rankRoute.get('/schoolLists', schoolList)

export default rankRoute
