import { ObjectType, Field, InputType, ID, Int } from 'type-graphql'
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserCardTradeProposal } from './userCardTradeProposal'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes'

@ObjectType()
@Entity('userCardTradeRequests')
export class UserCardTradeRequest extends BaseEntity {
  @Field(() => ID)
  @Column('int')
  performerUserId!: number

  @ManyToOne(() => User, (user) => user.tradeRequests, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'performerUserId' })
  user!: Promise<User>

  @Field(() => ID)
  @Column('int')
  cardTradeProposalId!: number

  @ManyToOne(() => UserCardTradeProposal, (userCardTradeProposal) => userCardTradeProposal.tradeRequests, {
    onDelete: 'CASCADE',
    eager: false,
  })
  userCardTradeProposal!: Promise<UserCardTradeProposal>

  @Field(() => Date)
  @Column()
  expiresAt!: Date

  @Field(() => Boolean)
  isExpired!: boolean

  @Field(() => Boolean)
  @Column({ default: false })
  isClosedByUser!: boolean

  @Field(() => Boolean)
  @Column({ default: false })
  isTraded!: boolean

  @Field(() => Int)
  @Column('int', { default: 0 })
  rating!: number

  @AfterLoad()
  checkIfIsExpired(): void {
    this.isExpired = new Date() > this.expiresAt
  }
}

@InputType()
export class UserCardTradeRequestCreateInput {
  @Field(() => ID)
  performerUserId!: number

  @Field(() => ID)
  cardTradeProposalId!: number
}

@InputType()
export class UserCardTradeRequestUpdateInput extends BaseUpdateInput {
  @Field(() => Boolean, { nullable: true })
  isClosedByUser?: boolean

  @Field(() => Boolean, { nullable: true })
  isTraded?: boolean

  @Field(() => Int, { nullable: true })
  rating?: number
}

@InputType()
export class UserCardTradeRequestFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  performerUserId?: number

  @Field(() => ID, { nullable: true })
  cardTradeProposalId?: number

  @Field(() => Boolean, { nullable: true })
  isExpired?: boolean

  @Field(() => Boolean, { nullable: true })
  isClosedByUser?: boolean

  @Field(() => Boolean, { nullable: true })
  isTraded?: boolean
}
