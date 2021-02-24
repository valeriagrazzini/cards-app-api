import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm'
import { Message } from './message'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput } from './_baseInputTypes'

@ObjectType()
@Unique('chats_index', ['creatorUserId', 'receiverUserId'])
@Entity('chats')
export class Chat extends BaseEntity {
  @Field(() => ID)
  @Column()
  creatorUserId!: number

  @ManyToOne(() => User, (user) => user.createdChats, {
    onDelete: 'CASCADE',
    eager: false,
  })
  creatorUser!: Promise<User>

  @Field(() => ID)
  @Column()
  receiverUserId!: number

  @ManyToOne(() => User, (user) => user.receivedChats, {
    onDelete: 'CASCADE',
    eager: false,
  })
  receiverUser!: Promise<User>

  @OneToMany(() => Message, (message) => message.chat)
  messages!: Promise<Message[]>
}

@InputType()
export class ChatCreateInput {
  @Field(() => ID)
  creatorUserId!: number

  @Field(() => ID)
  receiverUserId!: number
}

@InputType()
export class ChatFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  creatorUserId?: number

  @Field(() => ID, { nullable: true })
  receiverUserId?: number
}
