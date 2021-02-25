import { Card, CardFilterInput, CardCreateInput, CardUpdateInput, CardOrderInput } from '@/models/card'
import Container, { Service } from 'typedi'
import { getRepository } from 'typeorm'
import { BaseModelService } from './baseModelService'

@Service()
export class CardService {
  private modelName = 'Card'

  async findOne(id: number): Promise<Card | undefined> {
    const card = await Container.get(BaseModelService).findOne<Card>(this.modelName, id)
    return card
  }

  async findAll(filters?: CardFilterInput, order?: CardOrderInput): Promise<Card[]> {
    console.log('filters', filters)

    const baseQuery = getRepository<Card>('Card').createQueryBuilder('card')

    if (filters) {
      if (filters.id) {
        baseQuery.where('card.id = :id', { id: filters.id })
      } else if (filters.ids) {
        baseQuery.where(`card.id IN (${filters.ids.map(Number)})`)
      } else {
        if (filters.setId) {
          baseQuery.andWhere('card.setId = :setId', { setId: filters.setId })
        }
      }
    }
    if (order) {
      if (order.createdAt) {
        baseQuery.addOrderBy('card.createdAt', order.createdAt)
      }
      if (order.setId) {
        baseQuery.addOrderBy('card.setId', order.setId)
      }
      if (order.order) {
        baseQuery.addOrderBy('card.order', order.order)
      }
    } else {
      baseQuery.orderBy('card.id', 'ASC')
    }
    const queryResult = await baseQuery.getMany()
    return queryResult
  }

  async create(data: CardCreateInput): Promise<Card> {
    const card = await Container.get(BaseModelService).create<Card>(this.modelName, { ...data })
    return card
  }

  async update(data: CardUpdateInput): Promise<Card> {
    if (data.id) {
      data.id = +data.id
    }

    const card = await Container.get(BaseModelService).create<Card>(this.modelName, { ...data })
    return card
  }

  async delete(id: number): Promise<boolean> {
    const card = await Container.get(BaseModelService).delete<Card>(this.modelName, id)
    return card
  }
}
