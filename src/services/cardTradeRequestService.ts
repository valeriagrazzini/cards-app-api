import {
  UserCardTradeRequest,
  UserCardTradeRequestFilterInput,
  UserCardTradeRequestCreateInput,
  UserCardTradeRequestUpdateInput,
} from '../models/userCardTradeRequest'
import Container, { Service } from 'typedi'
import { BaseModelService } from './baseModelService'

@Service()
export class CardTradeRequestService {
  private _requestDurationInMinutes!: number

  public setConfiguration(configuration: { cardTradeRequestDurationInMinutes: number }): void {
    this._requestDurationInMinutes = configuration.cardTradeRequestDurationInMinutes
  }

  async findOne(id: number): Promise<UserCardTradeRequest | undefined> {
    const cardTradeRequest = await Container.get(BaseModelService).findOne<UserCardTradeRequest>(
      'UserCardTradeRequest',
      id
    )
    return cardTradeRequest
  }

  async findAll(data?: UserCardTradeRequestFilterInput): Promise<UserCardTradeRequest[]> {
    const cardTradeRequests = await Container.get(BaseModelService).findAll<UserCardTradeRequest>(
      'UserCardTradeRequest',
      data
    )
    return cardTradeRequests
  }

  async create(data: UserCardTradeRequestCreateInput): Promise<UserCardTradeRequest> {
    const now = new Date()
    const cardTradeRequest = await Container.get(BaseModelService).create<UserCardTradeRequest>(
      'UserCardTradeRequest',
      {
        ...data,
        expiresAt: new Date(now.getTime() + this._requestDurationInMinutes * 60000),
      }
    )
    return cardTradeRequest
  }

  async update(data: UserCardTradeRequestUpdateInput): Promise<UserCardTradeRequest> {
    const cardTradeRequest = await Container.get(BaseModelService).create<UserCardTradeRequest>(
      'UserCardTradeRequest',
      {
        ...data,
      }
    )
    return cardTradeRequest
  }

  async delete(id: number): Promise<boolean> {
    const cardTradeRequest = await Container.get(BaseModelService).delete<UserCardTradeRequest>(
      'UserCardTradeRequest',
      id
    )
    return cardTradeRequest
  }
}
