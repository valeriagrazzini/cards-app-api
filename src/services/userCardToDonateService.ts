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
import { Card } from '@/models/card'

@Service()
export class UserCardToDonateService {
  async findOne(id: number): Promise<UserCardToDonate | undefined> {
    const userCardToDonate = await Container.get(BaseModelService).findOne<UserCardToDonate>('UserCardToDonate', id)
    return userCardToDonate
  }

  async findAll(filters?: UserCardToDonateFilterInput): Promise<UserCardToDonate[]> {
    const result = await getRepository<UserCardToDonate>('UserCardToDonate').find({
      where: { ...filters },
      order: { cardId: 'ASC' },
    })
    return result
  }

  async findInSet(userId: number, setId: number): Promise<UserCardToDonate[]> {
    const queryResult = await getRepository<Card>('Card')
      .createQueryBuilder('cards')
      .leftJoin('userCardsToDonate', 'uctd', 'uctd.cardId = cards.id AND uctd.userId = :userId', { userId })
      .select('cards.name', 'name')
      .addSelect('cards.id', 'cardId')
      .addSelect('uctd.id', 'id')
      .addSelect('cards.pictureUrl', 'pictureUrl')
      .addSelect('cards.pictureThumbUrl', 'pictureThumbUrl')
      .addSelect('cards.rating', 'rating')
      .addSelect('cards.order', 'order')
      .addSelect('uctd.quantity', 'quantity')
      .where('cards.setId = :setId', { setId })
      .orderBy('cards.order', 'ASC')
      .getRawMany()

    const result = queryResult.map((x: any) => {
      return {
        id: x.id ? x.id : 0,
        userId: +userId,
        quantity: x.quantity ? x.quantity : 0,
        cardId: x.cardId,

        card: {
          id: x.cardId,
          name: x.name,
          setId: +setId,
          pictureUrl: x.pictureUrl,
          pictureThumbUrl: x.pictureThumbUrl,
          rating: x.rating,
          order: x.order,
        } as any,
      } as UserCardToDonate
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
    const userCardToDonate = await Container.get(BaseModelService).update<UserCardToDonate>('UserCardToDonate', {
      ...data,
    })
    return userCardToDonate
  }

  async upsert(data: UserCardToDonateUpdateInput): Promise<UserCardToDonate> {
    const repository = getRepository<UserCardToDonate>('UserCardToDonate')
    const entity = await repository.findOne(data.id)

    if (!entity) {
      return await repository.save({
        userId: data.userId,
        cardId: data.cardId,
        quantity: 1,
      })
    } else {
      return await repository.save(entity)
    }
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
    return result
  }
}
