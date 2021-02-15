import { CardService } from '../services/cardService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card, CardCreateInput, CardFilterInput, CardUpdateInput } from '../models/card'
import { Set } from '../models/set'
@Service()
@Resolver(Card)
export class CardResolver {
  @Inject()
  private cardService: CardService

  //@Authorized()
  @Query(() => Card, { nullable: true })
  async card(@Arg('id', () => ID) id: number): Promise<Card | undefined> {
    const card = await this.cardService.findOne(id)
    return card
  }

  //@Authorized()
  @Query(() => [Card])
  async cards(@Arg('filters', () => CardFilterInput, { nullable: true }) filters?: CardFilterInput): Promise<Card[]> {
    const cards = await this.cardService.findAll(filters)
    return cards
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Card)
  async createCard(@Arg('data', () => CardCreateInput) data: CardCreateInput): Promise<Card> {
    const card = await this.cardService.create(data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Card)
  async updateCard(@Arg('data', () => CardUpdateInput) data: CardUpdateInput): Promise<Card> {
    const card = await this.cardService.update(data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Query(() => Boolean)
  async deleteCard(@Arg('id', () => ID) id: number): Promise<boolean> {
    const card = await this.cardService.delete(id)
    return card
  }

  @FieldResolver(() => Set)
  async set(@Root() card: Card): Promise<Set> {
    return await card.set
  }
}
