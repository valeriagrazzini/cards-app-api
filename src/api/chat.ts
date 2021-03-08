import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, Subscription, Root, FieldResolver } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Chat, ChatCreateInput, ChatFilterInput, ChatUpdateInput } from '../models/chat'
import { User } from '../models/user'
import { getRepository } from 'typeorm'
const topic = 'MESSAGES'
@Service()
@Resolver(Chat)
export class ChatResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => Chat, { nullable: true })
  async chat(@Arg('id', () => ID) id: number): Promise<Chat | undefined> {
    const chat = await this.baseModelService.findOne<Chat>('Chat', id)
    return chat
  }

  //@Authorized()
  @Query(() => [Chat])
  async chats(@Arg('filters', () => ChatFilterInput, { nullable: true }) filters?: ChatFilterInput): Promise<Chat[]> {
    const chats = await this.baseModelService.findAll<Chat>('Chat', filters)
    return chats
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Chat)
  async createChat(@Arg('data', () => ChatCreateInput) data: ChatCreateInput): Promise<Chat> {
    const chat = await this.baseModelService.create<Chat>('Chat', data)
    return chat
  }

  @Mutation(() => Chat)
  async updateChat(@Arg('data', () => ChatUpdateInput) data: ChatUpdateInput): Promise<Chat> {
    const chat = await this.baseModelService.update<Chat>('Chat', data)
    return chat
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteChat(@Arg('id', () => ID) id: number): Promise<boolean> {
    const chat = await this.baseModelService.delete<Chat>('Chat', id)
    return chat
  }

  @Subscription(() => Chat, {
    topics: topic,
  })
  async newChat(@Root() notificationPayload: Chat): Promise<Chat> {
    return {
      ...notificationPayload,
    }
  }

  @FieldResolver(() => User, { nullable: true })
  async creatorUser(@Root() chat: Chat): Promise<User | undefined> {
    return await getRepository<User>('User').findOne(chat.creatorUserId)
  }

  @FieldResolver(() => User, { nullable: true })
  async receiverUser(@Root() chat: Chat): Promise<User | undefined> {
    return await getRepository<User>('User').findOne(chat.receiverUserId)
  }
}
