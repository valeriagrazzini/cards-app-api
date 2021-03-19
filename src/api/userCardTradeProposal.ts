import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root } from 'type-graphql'
import { Inject, Service } from 'typedi'
import {
  UserCardTradeProposal,
  UserCardTradeProposalCreateInput,
  UserCardTradeProposalFilterInput,
  UserCardTradeProposalUpdateInput,
} from '../models/userCardTradeProposal'
import { CardTradeOffer } from '../models/cardTradeOffer'
import { CardTradeRequest } from '../models/cardTradeRequest'
import { UserCardTradeProposalService } from '../services/userCardTradeProposalService'
import { getRepository } from 'typeorm'

@Service()
@Resolver(UserCardTradeProposal)
export class UserCardTradeProposalResolver {
  @Inject()
  private service: UserCardTradeProposalService

  //@Authorized()
  @Query(() => UserCardTradeProposal, { nullable: true })
  async userCardTradeProposal(@Arg('id', () => ID) id: number): Promise<UserCardTradeProposal | undefined> {
    const result = await this.service.findOne(id)
    return result
  }

  //@Authorized()
  @Query(() => [UserCardTradeProposal])
  async userCardTradeProposals(
    @Arg('data', () => UserCardTradeProposalFilterInput, { nullable: true }) data?: UserCardTradeProposalFilterInput
  ): Promise<UserCardTradeProposal[]> {
    const result = await this.service.findAll(data)
    return result
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardTradeProposal)
  async createUserCardTradeProposal(
    @Arg('data', () => UserCardTradeProposalCreateInput) data: UserCardTradeProposalCreateInput
  ): Promise<UserCardTradeProposal> {
    const result = await this.service.create(data)
    return result
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => UserCardTradeProposal)
  async updateUserCardTradeProposal(
    @Arg('data', () => UserCardTradeProposalUpdateInput) data: UserCardTradeProposalUpdateInput
  ): Promise<UserCardTradeProposal> {
    const result = await this.service.update(data)
    return result
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteUserCardTradeProposal(@Arg('id', () => ID) id: number): Promise<boolean> {
    const result = await this.service.delete(id)
    return result
  }

  @FieldResolver(() => [CardTradeOffer])
  async cardsOffered(@Root() userCardTradeProposal: UserCardTradeProposal): Promise<CardTradeOffer[]> {
    const result = await getRepository<CardTradeOffer>('CardTradeOffer').find({
      where: { cardTradeProposalId: userCardTradeProposal.id },
    })
    return result
  }

  @FieldResolver(() => [CardTradeRequest])
  async cardsRequested(@Root() userCardTradeProposal: UserCardTradeProposal): Promise<CardTradeRequest[]> {
    const result = await getRepository<CardTradeRequest>('CardTradeRequest').find({
      where: { cardTradeProposalId: userCardTradeProposal.id },
    })
    return result
  }
}
