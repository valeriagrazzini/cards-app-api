import Container, { Service } from 'typedi'
import { BaseModelService } from './baseModelService'
import { UserRole } from '../auth/role'

import {
  UserCardToDonate,
  UserCardToDonateFilterInput,
  UserCardToDonateCreateInput,
  UserCardToDonateUpdateInput,
  UserCardToDonateUpdateQuantityInput,
} from '@/models/userCardToDonate'
import { getRepository } from 'typeorm'

@Service()
export class UserCardToDonateService {
  async findOne(id: number): Promise<UserCardToDonate | undefined> {
    const userCardToDonate = await Container.get(BaseModelService).findOne<UserCardToDonate>('UserCardToDonate', id)
    return userCardToDonate
  }

  async findAll(filters?: UserCardToDonateFilterInput): Promise<UserCardToDonate[]> {
    const result = await getRepository<UserCardToDonate>('UserCardToDonate').find({
      where: { ...filters },
      order: { id: 'ASC', cardId: 'ASC' },
    })
    return result
  }

  async create(data: UserCardToDonateCreateInput): Promise<UserCardToDonate> {
    const userCardToDonate = await Container.get(BaseModelService).create<UserCardToDonate>('UserCardToDonate', {
      ...data,
      roles: [UserRole.USER],
    })
    return userCardToDonate
  }

  async update(data: UserCardToDonateUpdateInput): Promise<UserCardToDonate> {
    const userCardToDonate = await Container.get(BaseModelService).create<UserCardToDonate>('UserCardToDonate', {
      ...data,
    })
    return userCardToDonate
  }

  async updateQuantity(data: UserCardToDonateUpdateQuantityInput): Promise<UserCardToDonate> {
    const repository = getRepository<UserCardToDonate>('UserCardToDonate')
    const entity = await repository.findOne({ where: { userId: data.userId, cardId: data.cardId } })
    if (!entity) {
      return await repository.save({
        userId: data.userId,
        cardId: data.cardId,
        quantity: 1,
      })
    } else {
      const newQuantity = data.remove ? entity.quantity - 1 : entity.quantity + 1

      if (newQuantity > 0) {
        entity.quantity = newQuantity
        return await repository.save(entity)
      }
      return entity
    }
  }

  async delete(id: number): Promise<boolean> {
    const userCardToDonate = await Container.get(BaseModelService).delete<UserCardToDonate>('UserCardToDonate', id)
    return userCardToDonate
  }

  async deleteBy(filters: UserCardToDonateFilterInput): Promise<UserCardToDonate[]> {
    const repository = getRepository<UserCardToDonate>('UserCardToDonate')
    const entitiesToRemove = await repository.find({ where: { ...filters } })

    const result = await repository.remove(entitiesToRemove)
    console.log('result', result)
    return result
  }
}
