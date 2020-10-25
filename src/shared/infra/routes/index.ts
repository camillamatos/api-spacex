import { Router } from 'express'

import usersRouter from '../../../modules/users/infra/http/routes/users.routes'
import newsRouter from '../../../modules/news/infra/http/routes/news.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/news', newsRouter)

export default routes
