import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card } from '../models/card'
import {
  UserCardToDonate,
  UserCardToDonateCreateInput,
  UserCardToDonateFilterInput,
  UserCardToDonateUpdateInput,
} from '../models/userCardToDonate'

@Service()
@Resolver(UserCardToDonate)
export class UserCardToDonateResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => UserCardToDonate, { nullable: true })
  async userCardToDonate(@Arg('id', () => ID) id: number): Promise<UserCardToDonate | undefined> {
    const card = await this.baseModelService.findOne<UserCardToDonate>('UserCardToDonate', id)
    return card
  }

  //@Authorized()
  @Query(() => [UserCardToDonate])
  async userCardToDonates(
    @Arg('filters', () => UserCardToDonateFilterInput, { nullable: true }) filters?: UserCardToDonateFilterInput
  ): Promise<UserCardToDonate[]> {
    const cards = await this.baseModelService.findAll<UserCardToDonate>('UserCardToDonate', filters)
    return cards
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardToDonate)
  async createUserCardToDonate(
    @Arg('data', () => UserCardToDonateCreateInput) data: UserCardToDonateCreateInput
  ): Promise<UserCardToDonate> {
    const card = await this.baseModelService.create<UserCardToDonate>('UserCardToDonate', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardToDonate)
  async updateUserCardToDonate(
    @Arg('data', () => UserCardToDonateUpdateInput) data: UserCardToDonateUpdateInput
  ): Promise<UserCardToDonate> {
    const card = await this.baseModelService.update<UserCardToDonate>('UserCardToDonate', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteUserCardToDonate(@Arg('id', () => ID) id: number): Promise<boolean> {
    const card = await this.baseModelService.delete<UserCardToDonate>('UserCardToDonate', id)
    return card
  }

  @FieldResolver(() => Card)
  async card(@Root() userCardToDonate: UserCardToDonate): Promise<Card> {
    return await userCardToDonate.card
  }
}
