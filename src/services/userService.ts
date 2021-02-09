import { User, UserFilterInput, UserCreateInput, UserUpdateInput, UserPaginatedResult } from '../models/user'
import Container, { Service } from 'typedi'
import { BaseModelService } from './baseModelService'
import { UserRole } from '../auth/role'
import { getRepository } from 'typeorm'

@Service()
export class UserService {
  async findOne(id: number): Promise<User | undefined> {
    const user = await Container.get(BaseModelService).findOne<User>('User', id)
    return user
  }

  async findAll(filters?: UserFilterInput): Promise<User[]> {
    const users = await Container.get(BaseModelService).findAll<User>('User', filters)
    return users
  }

  async findAllPaginated(offset: number, take: number, filters?: UserFilterInput): Promise<UserPaginatedResult> {
    const [rows, total] = await getRepository<User>('User')
      .createQueryBuilder('user')
      .where({ ...filters })
      .take(take)
      .skip(offset * take)
      .getManyAndCount()

    const result = {
      data: rows,
      total,
      offset,
      take,
    }
    return result
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
