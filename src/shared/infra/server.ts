
import express from 'express'
import cors from 'cors'
import routes from './routes'
import { MongoHelper } from './mongo-helper'

const start = async () => {
  try {
    await MongoHelper.connect('mongodb+srv://dbSpaceX:spacex@cluster0.vsp1e.mongodb.net/dbSpaceX?retryWrites=true&w=majority')
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(routes)
    app.listen(process.env.PORT || 3333, () => {console.log('Server running on port 3333')})
  } catch (error) {
    console.log(error)
  }
}

start()
