import express from 'express'
import authRoute from './auth';

const apiRoute = express.Router()
apiRoute.use("/auth", authRoute);

export default apiRoute
