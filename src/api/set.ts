import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Set, SetCreateInput, SetFilterInput, SetUpdateInput } from '../models/set'
import { Card } from '../models/card'
import { SetLocalization } from '../models/setLocalization'

@Service()
@Resolver(Set)
export class SetResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => Set, { nullable: true })
  async set(@Arg('id', () => ID) id: number): Promise<Set | undefined> {
    const set = await this.baseModelService.findOne<Set>('Set', id)
    return set
  }

  //@Authorized()
  @Query(() => [Set])
  async sets(@Arg('data', () => SetFilterInput, { nullable: true }) data?: SetFilterInput): Promise<Set[]> {
    const sets = await this.baseModelService.findAll<Set>('Set', data)
    return sets
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Set)
  async createSet(@Arg('data', () => SetCreateInput) data: SetCreateInput): Promise<Set> {
    const set = await this.baseModelService.create<Set>('Set', data)
    return set
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Set)
  async updateSet(@Arg('data', () => SetUpdateInput) data: SetUpdateInput): Promise<Set> {
    const set = await this.baseModelService.update<Set>('Set', data)
    return set
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteSet(@Arg('id', () => ID) id: number): Promise<boolean> {
    const set = await this.baseModelService.delete<Set>('Set', id)
    return set
  }

  @FieldResolver(() => [Card])
  async cards(@Root() set: Set): Promise<Card[]> {
    return (await set.cards).sort((a, b) => a.order - b.order)
  }

  @FieldResolver(() => [SetLocalization])
  async localizations(@Root() set: Set): Promise<SetLocalization[]> {
    return await set.localizations
  }
}
