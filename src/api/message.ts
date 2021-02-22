import { BaseModelService } from '../services/baseModelService'
import { Resolver, Query, Arg, ID, Mutation, Subscription, PubSub, Root, PubSubEngine } from 'type-graphql'
import { Inject, Service } from 'typedi'
import { Message, MessageCreateInput, MessageFilterInput } from '../models/message'
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
    @Arg('data', () => MessageFilterInput, { nullable: true }) data?: MessageFilterInput
  ): Promise<Message[]> {
    const messages = await this.baseModelService.findAll<Message>('Message', data)
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
  })
  async newMessage(@Root() notificationPayload: Message): Promise<Message> {
    return {
      ...notificationPayload,
    }
  }
}
