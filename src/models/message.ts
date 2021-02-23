import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput } from './_baseInputTypes'

@ObjectType()
@Entity('messages')
export class Message extends BaseEntity {
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
}

@InputType()
export class MessageCreateInput {
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
  senderUserId?: number

  @Field(() => ID, { nullable: true })
  receiverUserId?: number
}
