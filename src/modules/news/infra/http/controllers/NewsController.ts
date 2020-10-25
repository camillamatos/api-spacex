import { Request, Response } from 'express'
import NewsRepository from '../../repositories/NewsRepository'

export default class NewsController {
  async create(request: Request, response: Response): Promise<any> {
    const { title, description, author } = request.body
    const createNews = new NewsRepository()
    const news = await createNews.create({
      title,
      description,
      author
    });

    return response.json(news);
  }

  async index(request: Request, response: Response): Promise<any> {
    const findAll = new NewsRepository()
    const news = await findAll.index()

    return response.json(news)  
  }

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.params
    const news = request.body
    const updateNews = new NewsRepository()
    const updatedNews = await updateNews.update(id, news)

    return response.json(updatedNews)
  }

  async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params
    const showNews = new NewsRepository()
    const news = await showNews.show(id)

    return response.json(news)
  }

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params
    const deleteNews = new NewsRepository()
    await deleteNews.delete(id)

    return response.sendStatus(204)
  }
}
