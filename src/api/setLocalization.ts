import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Set } from '../models/set'
import {
  SetLocalization,
  SetLocalizationCreateInput,
  SetLocalizationFilterInput,
  SetLocalizationUpdateInput,
} from '../models/setLocalization'

@Service()
@Resolver(SetLocalization)
export class SetLocalizationResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => SetLocalization, { nullable: true })
  async setLocalization(@Arg('id', () => ID) id: number): Promise<SetLocalization | undefined> {
    const set = await this.baseModelService.findOne<SetLocalization>('SetLocalization', id)
    return set
  }

  //@Authorized()
  @Query(() => [SetLocalization])
  async setLocalizations(
    @Arg('data', () => SetLocalizationFilterInput, { nullable: true }) data?: SetLocalizationFilterInput
  ): Promise<SetLocalization[]> {
    const sets = await this.baseModelService.findAll<SetLocalization>('SetLocalization', data)
    return sets
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => SetLocalization)
  async createSetLocalization(
    @Arg('data', () => SetLocalizationCreateInput) data: SetLocalizationCreateInput
  ): Promise<SetLocalization> {
    const set = await this.baseModelService.create<SetLocalization>('SetLocalization', data)
    return set
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => SetLocalization)
  async updateSetLocalization(
    @Arg('data', () => SetLocalizationUpdateInput) data: SetLocalizationUpdateInput
  ): Promise<Set> {
    const set = await this.baseModelService.update<Set>('Set', data)
    return set
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteSetLocalization(@Arg('id', () => ID) id: number): Promise<boolean> {
    const set = await this.baseModelService.delete<SetLocalization>('SetLocalization', id)
    return set
  }
}
