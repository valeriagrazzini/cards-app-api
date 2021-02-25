import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { Card } from './card'
import { Chat } from './chat'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput } from './_baseInputTypes'

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
  chat!: Promise<Chat>

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

  @ManyToMany(() => Card, (card) => card.messages, { onDelete: 'SET NULL' })
  @JoinTable({ name: 'messages_cards' })
  cards: Promise<Card[]>
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
