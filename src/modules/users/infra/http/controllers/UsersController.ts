import { Request, Response } from 'express'
import UsersRepository from '../../repositories/UserRepository'

export default class UsersController {
  async create (request: Request, response: Response): Promise<any> {
    const { name, email, address, phone, password } = request.body
    const createUser = new UsersRepository()
    const user = await createUser.create({
      name,
      email,
      address,
      phone,
      password
    })

    return response.json(user)
  }

  async auth (request: Request, response: Response): Promise<any> {
    const { email, password } = request.body
    const authUser = new UsersRepository()
    const user = await authUser.auth(email, password)

    return response.json(user)
  }

  async index (request: Request, response: Response): Promise<any> {
    const findAll = new UsersRepository()
    const user = await findAll.index()

    return response.json(user)
  }

  async update (request: Request, response: Response): Promise<any> {
    const { id } = request.params
    const user = request.body
    const updateUser = new UsersRepository()
    const updatedUser = await updateUser.update(id, user)

    return response.json(updatedUser)
  }

  async show (request: Request, response: Response): Promise<any> {
    const { id } = request.params
    const showUser = new UsersRepository()
    const user = await showUser.show(id)

    return response.json(user)
  }

  async delete (request: Request, response: Response): Promise<any> {
    const { id } = request.params
    const deleteUser = new UsersRepository()
    await deleteUser.delete(id)

    return response.sendStatus(204)
  }
}
