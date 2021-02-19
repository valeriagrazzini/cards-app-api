import { UserCardToDonateService } from '../services/userCardToDonateService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card } from '../models/card'
import {
  UserCardToDonate,
  UserCardToDonateCreateInput,
  UserCardToDonateFilterInput,
  UserCardToDonateUpdateInput,
  UserCardToDonateUpdateQuantityInput,
} from '../models/userCardToDonate'

@Service()
@Resolver(UserCardToDonate)
export class UserCardToDonateResolver {
  @Inject()
  private userCardToDonateService: UserCardToDonateService

  //@Authorized()
  @Query(() => UserCardToDonate, { nullable: true })
  async userCardToDonate(@Arg('id', () => ID) id: number): Promise<UserCardToDonate | undefined> {
    const card = await this.userCardToDonateService.findOne(id)
    return card
  }

  //@Authorized()
  @Query(() => [UserCardToDonate])
  async userCardToDonates(
    @Arg('filters', () => UserCardToDonateFilterInput, { nullable: true }) filters?: UserCardToDonateFilterInput
  ): Promise<UserCardToDonate[]> {
    const cards = await this.userCardToDonateService.findAll(filters)
    return cards
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardToDonate)
  async createUserCardToDonate(
    @Arg('data', () => UserCardToDonateCreateInput) data: UserCardToDonateCreateInput
  ): Promise<UserCardToDonate> {
    const card = await this.userCardToDonateService.create(data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardToDonate)
  async updateUserCardToDonate(
    @Arg('data', () => UserCardToDonateUpdateInput) data: UserCardToDonateUpdateInput
  ): Promise<UserCardToDonate> {
    const card = await this.userCardToDonateService.update(data)
    return card
  }

  @Mutation(() => UserCardToDonate)
  async updateUserCardToDonateQuantity(
    @Arg('data', () => UserCardToDonateUpdateQuantityInput) data: UserCardToDonateUpdateQuantityInput
  ): Promise<UserCardToDonate> {
    const card = await this.userCardToDonateService.updateQuantity(data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteUserCardToDonate(@Arg('id', () => ID) id: number): Promise<boolean> {
    const card = await this.userCardToDonateService.delete(id)
    return card
  }

  @Mutation(() => [UserCardToDonate])
  async deleteUserCardToDonateBy(
    @Arg('filters', () => UserCardToDonateFilterInput) filters: UserCardToDonateFilterInput
  ): Promise<UserCardToDonate[]> {
    const result = await this.userCardToDonateService.deleteBy(filters)
    return result
  }

  @FieldResolver(() => Card)
  async card(@Root() userCardToDonate: UserCardToDonate): Promise<Card> {
    return await userCardToDonate.card
  }
}
