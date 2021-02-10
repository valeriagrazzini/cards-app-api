import { UserService } from '../services/userService'
import { Resolver, Query, Arg, ID, Mutation, FieldResolver, Root, Int } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { User, UserCreateInput, UserFilterInput, UserPaginatedResult, UserUpdateInput } from '../models/user'
import { UserCardTradeProposal } from '../models/userCardTradeProposal'
import { UserCardToDonate } from '../models/userCardToDonate'

@Service()
@Resolver(User)
export class UserResolver {
  @Inject()
  private userService: UserService

  //@Authorized()
  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => ID) id: number): Promise<User | undefined> {
    const user = await this.userService.findOne(id)
    return user
  }

  //@Authorized()
  @Query(() => [User])
  async users(@Arg('filters', () => UserFilterInput, { nullable: true }) filters?: UserFilterInput): Promise<User[]> {
    const users = await this.userService.findAll(filters)
    return users
  }

  @Query(() => UserPaginatedResult)
  async usersPaginated(
    @Arg('offset', () => Int) offset: number,
    @Arg('take', () => Int) take: number,
    @Arg('filters', () => UserFilterInput, { nullable: true }) filters?: UserFilterInput
  ): Promise<UserPaginatedResult> {
    const result = await this.userService.findAllPaginated(offset, take, filters)

    return result
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => User)
  async createUser(@Arg('data', () => UserCreateInput) data: UserCreateInput): Promise<User> {
    const user = await this.userService.create(data)
    return user
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => User)
  async updateUser(@Arg('data', () => UserUpdateInput) data: UserUpdateInput): Promise<User> {
    const user = await this.userService.update(data)
    return user
  }

  //@Authorized(['ADMIN'])
  @Query(() => Boolean)
  async deleteUser(@Arg('id', () => ID) id: number): Promise<boolean> {
    const user = await this.userService.delete(id)
    return user
  }

  @FieldResolver(() => [UserCardTradeProposal])
  async tradeProposals(@Root() user: User): Promise<UserCardTradeProposal[]> {
    return await user.tradeProposals
  }

  @FieldResolver(() => [UserCardToDonate])
  async cardsToDonate(@Root() user: User): Promise<UserCardToDonate[]> {
    return await user.cardsToDonate
  }
}
