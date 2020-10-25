import News from '../dtos/News'

export default interface INewsRepository {
  index(): Promise<News[]>
  create(data: News): Promise<News>
  update(id: string, news: News): Promise<News>
  delete(id: string): Promise<void>
  show(id: string): Promise<News>
}