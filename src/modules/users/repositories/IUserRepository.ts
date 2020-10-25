import User from '../dtos/User'

export default interface IUsersRepository {
  index(): Promise<User[]>
  create(data: User): Promise<User>
  update(id: string, user: User): Promise<User>
  delete(id: string): Promise<void>
  show(id: string): Promise<User>
  auth(email: string, password: string): Promise<any>
}