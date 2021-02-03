import { CardService } from '../services/cardService'
import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card, CardCreateInput, CardFilterInput, CardUpdateInput } from '../models/card'

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
  async cards(@Arg('data', () => CardFilterInput, { nullable: true }) data?: CardFilterInput): Promise<Card[]> {
    const cards = await this.cardService.findAll(data)
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
}
