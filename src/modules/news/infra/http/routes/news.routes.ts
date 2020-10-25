import { Router } from 'express'
import NewsController from '../controllers/NewsController'

const newsRouter = Router();
const newsController = new NewsController()

newsRouter.get('/', newsController.index)
newsRouter.get('/:id', newsController.show)
newsRouter.post('/', newsController.create)
newsRouter.put('/:id', newsController.update)
newsRouter.delete('/:id', newsController.delete)

export default newsRouter
