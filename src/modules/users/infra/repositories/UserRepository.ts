import { MongoHelper } from '../../../../shared/infra/mongo-helper'
import { ObjectId, WithId } from 'mongodb'
import { sign } from 'jsonwebtoken'

import IUsersRepository from '../../repositories/IUserRepository'
import User from '../../dtos/User'
import BCryptHashProvider from '../../providers/HashProvider'

class UsersRepository implements IUsersRepository {
  public async index (): Promise<User[]> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.find<WithId<User>>({}).toArray()

    return result
  }

  public async create ({ name, email, address, phone, password }: User): Promise<User> {
    const hashProvider = new BCryptHashProvider()

    const userCollection = await MongoHelper.getCollection('users')
    const hashedPassword = await hashProvider.generateHash(password)
    const result = await userCollection.insertOne({ name, email, address, phone, hashedPassword })
    const user = await userCollection.findOne<WithId<User>>({ _id: result.insertedId })

    return user
  }

  public async update (id: string, { name, email, address, phone, password }: User): Promise<User> {
    const hashProvider = new BCryptHashProvider()
    const userCollection = await MongoHelper.getCollection('users')
    const hashedPassword = await hashProvider.generateHash(password)

    const result = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          email,
          address,
          phone,
          hashedPassword
        }
      }
    )

    const user = result.value as WithId<User>

    return user
  }

  public async show (id: string): Promise<User> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.findOne<WithId<User>>({ _id: new ObjectId(id) })
    const user = result

    return user
  }

  public async delete (id: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.findOneAndDelete({ _id: new ObjectId(id) })
  }

  public async auth (email: string, password: string): Promise<any> {
    const hashProvider = new BCryptHashProvider()

    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email })

    if (!result) {
      return null
    }

    const passwordMatched = await hashProvider.compareHash(password, result.hashedPassword)

    if (!passwordMatched) {
      return null
    }

    const token = sign({}, '05513af514', {
      subject: result.name
    })

    return { result, token }
  }
}

export default UsersRepository
