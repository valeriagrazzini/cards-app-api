import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card } from '../models/card'
import {
  CardTradeOffer,
  CardTradeOfferCreateInput,
  CardTradeOfferFilterInput,
  CardTradeOfferUpdateInput,
} from '../models/cardTradeOffer'
import { getRepository } from 'typeorm'

@Service()
@Resolver(CardTradeOffer)
export class CardTradeOfferResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => CardTradeOffer, { nullable: true })
  async cardTradeOffer(@Arg('id', () => ID) id: number): Promise<CardTradeOffer | undefined> {
    const card = await this.baseModelService.findOne<CardTradeOffer>('CardTradeOffer', id)
    return card
  }

  //@Authorized()
  @Query(() => [CardTradeOffer])
  async cardTradeOffers(
    @Arg('data', () => CardTradeOfferFilterInput, { nullable: true }) data?: CardTradeOfferFilterInput
  ): Promise<CardTradeOffer[]> {
    const cards = await this.baseModelService.findAll<CardTradeOffer>('CardTradeOffer', data)
    return cards
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardTradeOffer)
  async createCardTradeOffer(
    @Arg('data', () => CardTradeOfferCreateInput) data: CardTradeOfferCreateInput
  ): Promise<CardTradeOffer> {
    const card = await this.baseModelService.create<CardTradeOffer>('CardTradeOffer', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardTradeOffer)
  async updateCardTradeOffer(
    @Arg('data', () => CardTradeOfferUpdateInput) data: CardTradeOfferUpdateInput
  ): Promise<Card> {
    const card = await this.baseModelService.update<Card>('Card', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteCardTradeOffer(@Arg('id', () => ID) id: number): Promise<boolean> {
    const card = await this.baseModelService.delete<CardTradeOffer>('CardTradeOffer', id)
    return card
  }

  @FieldResolver(() => Card, { nullable: true })
  async card(@Root() cardTradeOffer: CardTradeOffer): Promise<Card | undefined> {
    return await getRepository<Card>('Card').findOne(cardTradeOffer.cardId)
  }
}
