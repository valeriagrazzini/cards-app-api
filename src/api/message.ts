import { BaseModelService } from '../services/baseModelService'
import {
  Resolver,
  Query,
  Arg,
  ID,
  Mutation,
  Subscription,
  PubSub,
  Root,
  PubSubEngine,
  FieldResolver,
} from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Message, MessageCreateInput, MessageFilterInput } from '../models/message'
import { User } from '../models/user'
import { getRepository } from 'typeorm'
const topic = 'MESSAGES'
@Service()
@Resolver(Message)
export class MessageResolver {
  @Inject()
  private baseModelService: BaseModelService

  //@Authorized()
  @Query(() => Message, { nullable: true })
  async message(@Arg('id', () => ID) id: number): Promise<Message | undefined> {
    const message = await this.baseModelService.findOne<Message>('Message', id)
    return message
  }

  //@Authorized()
  @Query(() => [Message])
  async messages(
    @Arg('filters', () => MessageFilterInput, { nullable: true }) filters?: MessageFilterInput
  ): Promise<Message[]> {
    console.log('filters', filters)
    const messages = await this.baseModelService.findAll<Message>('Message', filters)
    return messages
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Message)
  async createMessage(
    @Arg('data', () => MessageCreateInput) data: MessageCreateInput,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
    const message = await this.baseModelService.create<Message>('Message', data)
    await pubSub.publish(topic, message)

    return message
  }

  //@Authorized(['ADMIN'])
  @Mutation(() => Boolean)
  async deleteMessage(@Arg('id', () => ID) id: number): Promise<boolean> {
    const message = await this.baseModelService.delete<Message>('Message', id)
    return message
  }

  @Subscription(() => Message, {
    topics: topic,
    filter: ({ payload, args }) => args.chatId == payload.chatId,
  })
  async newMessage(@Root() message: Message, @Arg('chatId', () => ID) chatId: number): Promise<Message> {
    return {
      ...message,
    }
  }

  @FieldResolver(() => User, { nullable: true })
  async senderUser(@Root() message: Message): Promise<User | undefined> {
    return await getRepository<User>('User').findOne(message.senderUserId)
  }

  @FieldResolver(() => User, { nullable: true })
  async receiverUser(@Root() message: Message): Promise<User | undefined> {
    return await getRepository<User>('User').findOne(message.receiverUserId)
  }
}
