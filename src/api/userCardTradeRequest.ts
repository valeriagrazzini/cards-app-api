import { CardTradeRequestService } from '../services/cardTradeRequestService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import {
  UserCardTradeRequest,
  UserCardTradeRequestCreateInput,
  UserCardTradeRequestFilterInput,
  UserCardTradeRequestUpdateInput,
} from '../models/userCardTradeRequest'
import { User } from '../models/user'
import { UserCardTradeProposal } from '../models/userCardTradeProposal'

@Service()
@Resolver(UserCardTradeRequest)
export class UserCardTradeRequestResolver {
  @Inject()
  private cardTradeRequestService: CardTradeRequestService

  //@Authorized()
  @Query(() => UserCardTradeRequest, { nullable: true })
  async cardTradeRequest(@Arg('id', () => ID) id: number): Promise<UserCardTradeRequest | undefined> {
    const cardTradeRequest = await this.cardTradeRequestService.findOne(id)
    return cardTradeRequest
  }

  //@Authorized()
  @Query(() => [UserCardTradeRequest])
  async cardTradeRequests(
    @Arg('data', () => UserCardTradeRequestFilterInput, { nullable: true }) data?: UserCardTradeRequestFilterInput
  ): Promise<UserCardTradeRequest[]> {
    const tradeRequests = await this.cardTradeRequestService.findAll(data)
    return tradeRequests
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardTradeRequest)
  async createCardTradeRequest(
    @Arg('data', () => UserCardTradeRequestCreateInput) data: UserCardTradeRequestCreateInput
  ): Promise<UserCardTradeRequest> {
    const cardTradeRequest = await this.cardTradeRequestService.create(data)
    return cardTradeRequest
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardTradeRequest)
  async updateCardTradeRequest(
    @Arg('data', () => UserCardTradeRequestUpdateInput) data: UserCardTradeRequestUpdateInput
  ): Promise<UserCardTradeRequest> {
    const cardTradeRequest = await this.cardTradeRequestService.update(data)
    return cardTradeRequest
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteCardTradeRequest(@Arg('id', () => ID) id: number): Promise<boolean> {
    const cardTradeRequest = await this.cardTradeRequestService.delete(id)
    return cardTradeRequest
  }

  @FieldResolver(() => User)
  async user(@Root() cardTradeRequest: UserCardTradeRequest): Promise<User> {
    return await cardTradeRequest.user
  }

  @FieldResolver(() => UserCardTradeProposal)
  async proposal(@Root() cardTradeRequest: UserCardTradeRequest): Promise<UserCardTradeProposal> {
    return await cardTradeRequest.userCardTradeProposal
  }
}
