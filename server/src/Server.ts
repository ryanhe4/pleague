import express from 'express'
import apiRoute from './routes/api'
import morgan from 'morgan'

const PORT: number = 4000

export default class Server {
  app: express.Application = express()

  constructor() {
    this.setup()
  }

  setup() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))

    this.app.use(morgan('dev'))

    this.app.use('/api',apiRoute)
  }

  start() {
    try {
      this.app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`)
      })
    } catch (e) {
      console.error(e)
    }
  }

}
