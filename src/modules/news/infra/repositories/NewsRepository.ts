import { MongoHelper } from '../../../../shared/infra/mongo-helper'
import { ObjectId } from 'mongodb'

import INewsRepository from '../../repositories/INewsRepository'
import News from '../../dtos/News'

class NewsRepository implements INewsRepository {
  public async index(): Promise<any> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = newsCollection.find({}).toArray()

    return result
  }

  public async create(news: News): Promise<News> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = await newsCollection.insertOne(news)

    return result.ops[0]
  }

  public async update(id: string, {title, description}: News): Promise<News> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = await newsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) }, 
      { $set: { 
        title: title,
        description: description
      }}
    )

    return result.value
  }

  public async show(id: string): Promise<News> {
    const newsCollection = await MongoHelper.getCollection('news')
    const result = await newsCollection.findOne({ _id: new ObjectId(id) })

    return result
  }

  public async delete(id: string): Promise<void> {
    const newsCollection = await MongoHelper.getCollection('news')
    await newsCollection.findOneAndDelete({ _id: new ObjectId(id) })
  }
}

export default NewsRepository