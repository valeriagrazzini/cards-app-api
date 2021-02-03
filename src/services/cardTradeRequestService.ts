import {
  CardTradeRequest,
  CardTradeRequestFilterInput,
  CardTradeRequestCreateInput,
  CardTradeRequestUpdateInput,
} from '../models/cardTradeRequest'
import Container, { Service } from 'typedi'
import { BaseModelService } from './baseModelService'

@Service()
export class CardTradeRequestService {
  private _requestDurationInMinutes!: number

  public setConfiguration(configuration: { cardTradeRequestDurationInMinutes: number }): void {
    this._requestDurationInMinutes = configuration.cardTradeRequestDurationInMinutes
  }

  async findOne(id: number): Promise<CardTradeRequest | undefined> {
    const cardTradeRequest = await Container.get(BaseModelService).findOne<CardTradeRequest>('CardTradeRequest', id)
    return cardTradeRequest
  }

  async findAll(data?: CardTradeRequestFilterInput): Promise<CardTradeRequest[]> {
    const cardTradeRequests = await Container.get(BaseModelService).findAll<CardTradeRequest>('CardTradeRequest', data)
    return cardTradeRequests
  }

  async create(data: CardTradeRequestCreateInput): Promise<CardTradeRequest> {
    const now = new Date()
    const cardTradeRequest = await Container.get(BaseModelService).create<CardTradeRequest>('CardTradeRequest', {
      ...data,
      expiresAt: new Date(now.getTime() + this._requestDurationInMinutes * 60000),
    })
    return cardTradeRequest
  }

  async update(data: CardTradeRequestUpdateInput): Promise<CardTradeRequest> {
    const cardTradeRequest = await Container.get(BaseModelService).create<CardTradeRequest>('CardTradeRequest', {
      ...data,
    })
    return cardTradeRequest
  }

  async delete(id: number): Promise<boolean> {
    const cardTradeRequest = await Container.get(BaseModelService).delete<CardTradeRequest>('CardTradeRequest', id)
    return cardTradeRequest
  }
}
