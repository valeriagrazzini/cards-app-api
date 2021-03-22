import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card } from '../models/card'
import {
  CardTradeRequest,
  CardTradeRequestCreateInput,
  CardTradeRequestFilterInput,
  CardTradeRequestUpdateInput,
} from '../models/cardTradeRequest'
import { getRepository } from 'typeorm'

@Service()
@Resolver(CardTradeRequest)
export class CardTradeRequestResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => CardTradeRequest, { nullable: true })
  async cardTradeRequest(@Arg('id', () => ID) id: number): Promise<CardTradeRequest | undefined> {
    const card = await this.baseModelService.findOne<CardTradeRequest>('CardTradeRequest', id)
    return card
  }

  //@Authorized()
  @Query(() => [CardTradeRequest])
  async cardTradeRequests(
    @Arg('data', () => CardTradeRequestFilterInput, { nullable: true }) data?: CardTradeRequestFilterInput
  ): Promise<CardTradeRequest[]> {
    const cards = await this.baseModelService.findAll<CardTradeRequest>('CardTradeRequest', data)
    return cards
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardTradeRequest)
  async createCardTradeRequest(
    @Arg('data', () => CardTradeRequestCreateInput) data: CardTradeRequestCreateInput
  ): Promise<CardTradeRequest> {
    const card = await this.baseModelService.create<CardTradeRequest>('CardTradeRequest', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardTradeRequest)
  async updateCardTradeRequest(
    @Arg('data', () => CardTradeRequestUpdateInput) data: CardTradeRequestUpdateInput
  ): Promise<Card> {
    const card = await this.baseModelService.update<Card>('Card', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteCardTradeRequest(@Arg('id', () => ID) id: number): Promise<boolean> {
    const card = await this.baseModelService.delete<CardTradeRequest>('CardTradeRequest', id)
    return card
  }

  @FieldResolver(() => Card, { nullable: true })
  async card(@Root() cardTradeRequest: CardTradeRequest): Promise<Card | undefined> {
    return await getRepository<Card>('Card').findOne(cardTradeRequest.cardId)
  }
}
