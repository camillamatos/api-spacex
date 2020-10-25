
import express from 'express'
import cors from 'cors'
import routes from './routes'
import { MongoHelper } from './mongo-helper'

MongoHelper.connect('mongodb+srv://dbSpaceX:spacex@cluster0.vsp1e.mongodb.net/dbSpaceX?retryWrites=true&w=majority')
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(process.env.PORT, () => {console.log('Server running on port 3333')})