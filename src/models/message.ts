import { ObjectType, Field, InputType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes'

@ObjectType()
@Entity('messages')
export class Message extends BaseEntity {
  @Field()
  @Column()
  userId!: number

  @Field()
  @Column()
  senderName!: string

  @Field()
  @Column('text')
  text!: string
}

@InputType()
export class MessageCreateInput {
  @Field()
  userId!: number

  @Field()
  senderName!: string

  @Field()
  text!: string
}

@InputType()
export class MessageUpdateInput extends BaseUpdateInput {
  @Field({ nullable: true })
  text?: string
}

@InputType()
export class MessageFilterInput extends BaseFilterInput {
  @Field({ nullable: true })
  userId?: number

  @Field({ nullable: true })
  senderName?: string

  @Field({ nullable: true })
  text?: string
}
