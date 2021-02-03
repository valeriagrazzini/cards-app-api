import { CardTradeRequestService } from '../services/cardTradeRequestService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import {
  CardTradeRequest,
  CardTradeRequestCreateInput,
  CardTradeRequestFilterInput,
  CardTradeRequestUpdateInput,
} from '../models/cardTradeRequest'
import { User } from '../models/user'
import { UserCardTradeProposal } from '../models/userCardTradeProposal'

@Service()
@Resolver(CardTradeRequest)
export class CardTradeRequestResolver {
  @Inject()
  private cardTradeRequestService: CardTradeRequestService

  //@Authorized()
  @Query(() => CardTradeRequest, { nullable: true })
  async cardTradeRequest(@Arg('id', () => ID) id: number): Promise<CardTradeRequest | undefined> {
    const cardTradeRequest = await this.cardTradeRequestService.findOne(id)
    return cardTradeRequest
  }

  //@Authorized()
  @Query(() => [CardTradeRequest])
  async cardTradeRequests(
    @Arg('data', () => CardTradeRequestFilterInput, { nullable: true }) data?: CardTradeRequestFilterInput
  ): Promise<CardTradeRequest[]> {
    const tradeRequests = await this.cardTradeRequestService.findAll(data)
    return tradeRequests
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardTradeRequest)
  async createCardTradeRequest(
    @Arg('data', () => CardTradeRequestCreateInput) data: CardTradeRequestCreateInput
  ): Promise<CardTradeRequest> {
    const cardTradeRequest = await this.cardTradeRequestService.create(data)
    return cardTradeRequest
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => CardTradeRequest)
  async updateCardTradeRequest(
    @Arg('data', () => CardTradeRequestUpdateInput) data: CardTradeRequestUpdateInput
  ): Promise<CardTradeRequest> {
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
  async user(@Root() cardTradeRequest: CardTradeRequest): Promise<User> {
    return await cardTradeRequest.user
  }

  @FieldResolver(() => UserCardTradeProposal)
  async proposal(@Root() cardTradeRequest: CardTradeRequest): Promise<UserCardTradeProposal> {
    return await cardTradeRequest.userCardTradeProposal
  }
}
