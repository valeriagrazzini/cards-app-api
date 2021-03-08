import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { Card } from './card'
import { Chat } from './chat'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BaseOrderInput, BasePaginatedResult, Sorting } from './_baseInputTypes'

@ObjectType()
@Entity('messages')
export class Message extends BaseEntity {
  @Field(() => ID)
  @Column()
  chatId!: number

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    onDelete: 'CASCADE',
    eager: false,
  })
  chat!: Chat

  @Field(() => ID)
  @Column()
  senderUserId!: number

  @ManyToOne(() => User, (user) => user.sentMessages, {
    onDelete: 'CASCADE',
    eager: false,
  })
  senderUser!: Promise<User>

  @Field(() => ID)
  @Column()
  receiverUserId!: number

  @ManyToOne(() => User, (user) => user.receivedMessages, {
    onDelete: 'CASCADE',
    eager: false,
  })
  receiverUser!: Promise<User>

  @Field()
  @Column('text')
  text!: string

  @ManyToMany(() => Card, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'messages_cards',
    joinColumns: [{ name: 'messageId' }],
    inverseJoinColumns: [{ name: 'cardId' }],
  })
  cards: Card[]
}

@InputType()
export class MessageCreateInput {
  @Field(() => ID)
  chatId!: number

  @Field(() => ID)
  senderUserId!: number

  @Field(() => ID)
  receiverUserId!: number

  @Field()
  @Column('text')
  text!: string

  @Field(() => [ID], { nullable: true })
  cardIds?: number[]
}

@InputType()
export class MessageFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  chatId?: number

  @Field(() => ID, { nullable: true })
  senderUserId?: number

  @Field(() => ID, { nullable: true })
  receiverUserId?: number
}

@InputType()
export class MessageSortInput extends BaseOrderInput {
  @Field(() => Sorting, { nullable: true })
  id?: Sorting

  @Field(() => Sorting, { nullable: true })
  createdAt?: Sorting
}

@ObjectType()
export class MessagePaginatedResult extends BasePaginatedResult {
  @Field(() => [Message])
  data: Message[]
}
