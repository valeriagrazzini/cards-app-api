import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card } from '../models/card'
import {
  CardLocalization,
  CardLocalizationCreateInput,
  CardLocalizationFilterInput,
  CardLocalizationUpdateInput,
} from '../models/cardLocalization'

@Service()
@Resolver(CardLocalization)
export class CardLocalizationResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => CardLocalization, { nullable: true })
  async cardLocalization(@Arg('id', () => ID) id: number): Promise<CardLocalization | undefined> {
    const card = await this.baseModelService.findOne<CardLocalization>('CardLocalization', id)
    return card
  }

  //@Authorized()
  @Query(() => [CardLocalization])
  async cardLocalizations(
    @Arg('data', () => CardLocalizationFilterInput, { nullable: true }) data?: CardLocalizationFilterInput
  ): Promise<CardLocalization[]> {
    const cards = await this.baseModelService.findAll<CardLocalization>('CardLocalization', data)
    return cards
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardLocalization)
  async createCardLocalization(
    @Arg('data', () => CardLocalizationCreateInput) data: CardLocalizationCreateInput
  ): Promise<CardLocalization> {
    const card = await this.baseModelService.create<CardLocalization>('CardLocalization', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardLocalization)
  async updateCardLocalization(
    @Arg('data', () => CardLocalizationUpdateInput) data: CardLocalizationUpdateInput
  ): Promise<Card> {
    const card = await this.baseModelService.update<Card>('Card', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteCardLocalization(@Arg('id', () => ID) id: number): Promise<boolean> {
    const card = await this.baseModelService.delete<CardLocalization>('CardLocalization', id)
    return card
  }
}
