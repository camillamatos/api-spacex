import { MongoHelper } from '../../../../shared/infra/mongo-helper'
import { ObjectId, WithId } from 'mongodb'

import INewsRepository from '../../repositories/INewsRepository'
import News from '../../dtos/News'

class NewsRepository implements INewsRepository {
  public async index (): Promise<any> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = newsCollection.find({}).toArray()

    return result
  }

  public async create (news: News): Promise<News> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = await newsCollection.insertOne(news)
    const data = await newsCollection.findOne<WithId<News>>({ _id: result.insertedId })

    return data
  }

  public async update (id: string, { title, description }: News): Promise<News> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = await newsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          description
        }
      }
    )

    const news = result.value as WithId<News>

    return news
  }

  public async show (id: string): Promise<News> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = await newsCollection.findOne<WithId<News>>({ _id: new ObjectId(id) })

    return result
  }

  public async delete (id: string): Promise<void> {
    const newsCollection = await MongoHelper.getCollection('news')
    await newsCollection.findOneAndDelete({ _id: new ObjectId(id) })
  }
}

export default NewsRepository
