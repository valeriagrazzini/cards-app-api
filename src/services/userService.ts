import { User, UserFilterInput, UserCreateInput, UserUpdateInput } from '../models/user'
import Container, { Service } from 'typedi'
import { BaseModelService } from './baseModelService'
import { UserRole } from '../auth/role'

@Service()
export class UserService {
  async findOne(id: number): Promise<User | undefined> {
    const user = await Container.get(BaseModelService).findOne<User>('User', id)
    return user
  }

  async findAll(data?: UserFilterInput): Promise<User[]> {
    const users = await Container.get(BaseModelService).findAll<User>('User', data)
    return users
  }

  async create(data: UserCreateInput): Promise<User> {
    const user = await Container.get(BaseModelService).create<User>('User', { ...data, roles: [UserRole.USER] })
    return user
  }

  async update(data: UserUpdateInput): Promise<User> {
    const user = await Container.get(BaseModelService).create<User>('User', { ...data })
    return user
  }

  async delete(id: number): Promise<boolean> {
    const user = await Container.get(BaseModelService).delete<User>('User', id)
    return user
  }
}
