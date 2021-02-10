import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root, Int } from 'type-graphql'
import { Inject, Service } from 'typedi'
import {
  SpinRequest,
  SpinRequestCreateInput,
  SpinRequestFilterInput,
  SpinRequestUpdateInput,
  SpinRequestPaginatedResult,
} from '../models/spinRequest'

@Service()
@Resolver(SpinRequest)
export class SpinRequestResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => SpinRequest, { nullable: true })
  async spinRequest(@Arg('id', () => ID) id: number): Promise<SpinRequest | undefined> {
    const spinRequest = await this.baseModelService.findOne<SpinRequest>('SpinRequest', id)
    return spinRequest
  }

  //@Authorized()
  @Query(() => [SpinRequest])
  async spinRequests(
    @Arg('data', () => SpinRequestFilterInput, { nullable: true }) data?: SpinRequestFilterInput
  ): Promise<SpinRequest[]> {
    const spinRequests = await this.baseModelService.findAll<SpinRequest>('SpinRequest', data)
    return spinRequests
  }

  @Query(() => SpinRequestPaginatedResult)
  async spinRequestsPaginated(
    @Arg('offset', () => Int) offset: number,
    @Arg('take', () => Int) take: number,
    @Arg('filters', () => SpinRequestFilterInput, { nullable: true }) filters?: SpinRequestFilterInput
  ): Promise<SpinRequestPaginatedResult> {
    const result = await this.baseModelService.findAllPaginated<SpinRequest>('SpinRequest', offset, take, filters)

    return result
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => SpinRequest)
  async createSpinRequest(
    @Arg('data', () => SpinRequestCreateInput) data: SpinRequestCreateInput
  ): Promise<SpinRequest> {
    const now = new Date()
    const expiresAt = new Date(now.setMinutes(now.getMinutes() + 3))
    const spinRequest = await this.baseModelService.create<SpinRequest>('SpinRequest', { ...data, expiresAt })
    return spinRequest
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => SpinRequest)
  async updateSpinRequest(
    @Arg('data', () => SpinRequestUpdateInput) data: SpinRequestUpdateInput
  ): Promise<SpinRequest> {
    const spinRequest = await this.baseModelService.update<SpinRequest>('SpinRequest', data)
    return spinRequest
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteSpinRequest(@Arg('id', () => ID) id: number): Promise<boolean> {
    const spinRequest = await this.baseModelService.delete<SpinRequest>('SpinRequest', id)
    return spinRequest
  }

  @FieldResolver(() => Boolean)
  async isExpired(@Root() spinRequest: SpinRequest): Promise<boolean> {
    return new Date() > spinRequest.expiresAt
  }
}
