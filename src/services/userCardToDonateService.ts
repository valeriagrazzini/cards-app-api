import Container, { Service } from 'typedi'
import { BaseModelService } from './baseModelService'
import { UserRole } from '../auth/role'

import {
  UserCardToDonate,
  UserCardToDonateFilterInput,
  UserCardToDonateCreateInput,
  UserCardToDonateUpdateInput,
  UserCardToDonateUpdateQuantityInput,
  UserCardToDonateOrderInput,
  UserCardToDonatesearchResult,
} from '@/models/userCardToDonate'
import { getRepository } from 'typeorm'
import { Card } from '@/models/card'
import { User } from '@/models/user'

@Service()
export class UserCardToDonateService {
  async findOne(id: number): Promise<UserCardToDonate | undefined> {
    const userCardToDonate = await Container.get(BaseModelService).findOne<UserCardToDonate>('UserCardToDonate', id)
    return userCardToDonate
  }

  async findAll(
    filters?: UserCardToDonateFilterInput,
    order?: UserCardToDonateOrderInput
  ): Promise<UserCardToDonate[]> {
    console.log('filters', filters)

    const baseQuery = getRepository<UserCardToDonate>('UserCardToDonate').createQueryBuilder('uctd')

    if (filters) {
      if (filters.id) {
        baseQuery.where('uctd.id = :id', { id: filters.id })
      } else {
        if (filters.cardId) {
          baseQuery.andWhere('uctd.cardId = :cardId', { cardId: filters.cardId })
        }

        if (filters.userId) {
          baseQuery.andWhere('uctd.userId = :userId', { userId: filters.userId })
        }
        if (filters.cardIds) {
          baseQuery.andWhere(`uctd.cardId IN (${filters.cardIds.map(Number)})`)
        }
      }
    }
    if (order) {
      if (order.createdAt) {
        baseQuery.addOrderBy('uctd.createdAt', order.createdAt)
      }
      if (order.userId) {
        baseQuery.addOrderBy('uctd.userId', order.userId)
      }
      if (order.cardId) {
        baseQuery.addOrderBy('uctd.cardId', order.cardId)
      }
    } else {
      baseQuery.orderBy('uctd.cardId', 'ASC')
    }
    const queryResult = await baseQuery.getMany()
    return queryResult
  }

  async findAllUsers(cardIds: number[]): Promise<UserCardToDonatesearchResult[]> {
    if (cardIds.length == 0) {
      return []
    }

    const baseQuery = getRepository<UserCardToDonate>('UserCardToDonate')
      .createQueryBuilder('uctd')
      .innerJoin('users', 'user', '(uctd.userId = user.id AND user.isDeleted = FALSE AND user.isBanned = FALSE)')
      .select('user.id', 'userId')
      .addSelect('user.userName', 'userName')
      .addSelect('user.profilePictureUrl', 'profilePictureUrl')
      .addSelect('user.lang', 'lang')
      .addSelect('user.rating', 'rating')
      .addSelect('SUM(uctd.quantity)', 'total')
      .where(`uctd.cardId IN (${cardIds.map(Number)})`)
      .groupBy('user.id')
      .orderBy('total', 'DESC')

    const queryResult = await baseQuery.getRawMany()
    const result = queryResult.map((x) => {
      return {
        quantity: x.total,
        user: {
          id: x.userId,
          userName: x.userName,
          profilePictureUrl: x.profilePictureUrl,
          lang: x.lang,
          rating: x.rating,
        } as User,
      } as UserCardToDonatesearchResult
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
