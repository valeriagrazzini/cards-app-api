import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Card } from '../models/card'
import {
  UserCardTradeProposal,
  UserCardTradeProposalCreateInput,
  UserCardTradeProposalFilterInput,
  UserCardTradeProposalUpdateInput,
} from '../models/userCardTradeProposal'

@Service()
@Resolver(UserCardTradeProposal)
export class UserCardTradeProposalResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => UserCardTradeProposal, { nullable: true })
  async userCardTradeProposal(@Arg('id', () => ID) id: number): Promise<UserCardTradeProposal | undefined> {
    const card = await this.baseModelService.findOne<UserCardTradeProposal>('UserCardTradeProposal', id)
    return card
  }

  //@Authorized()
  @Query(() => [UserCardTradeProposal])
  async userCardTradeProposals(
    @Arg('data', () => UserCardTradeProposalFilterInput, { nullable: true }) data?: UserCardTradeProposalFilterInput
  ): Promise<UserCardTradeProposal[]> {
    const cards = await this.baseModelService.findAll<UserCardTradeProposal>('UserCardTradeProposal', data)
    return cards
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardTradeProposal)
  async createUserCardTradeProposal(
    @Arg('data', () => UserCardTradeProposalCreateInput) data: UserCardTradeProposalCreateInput
  ): Promise<UserCardTradeProposal> {
    const card = await this.baseModelService.create<UserCardTradeProposal>('UserCardTradeProposal', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardTradeProposal)
  async updateUserCardTradeProposal(
    @Arg('data', () => UserCardTradeProposalUpdateInput) data: UserCardTradeProposalUpdateInput
  ): Promise<Card> {
    const card = await this.baseModelService.update<Card>('Card', data)
    return card
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteUserCardTradeProposal(@Arg('id', () => ID) id: number): Promise<boolean> {
    const card = await this.baseModelService.delete<UserCardTradeProposal>('UserCardTradeProposal', id)
    return card
  }

  @FieldResolver(() => Card)
  async cardProposal(@Root() userCardTradeProposal: UserCardTradeProposal): Promise<Card> {
    return await userCardTradeProposal.cardProposal
  }

  @FieldResolver(() => Card)
  async cardRequest(@Root() userCardTradeProposal: UserCardTradeProposal): Promise<Card> {
    return await userCardTradeProposal.cardRequest
  }
}
