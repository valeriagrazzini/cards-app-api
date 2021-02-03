import { ObjectType, Field, InputType, ID, Int } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Card } from './card'
import { CardTradeRequest } from './cardTradeRequest'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes'

@ObjectType()
@Entity('userCardTradeProposals')
export class UserCardTradeProposal extends BaseEntity {
  @Field(() => ID)
  @Column('int')
  userId!: number

  @ManyToOne(() => User, (user) => user.tradeProposals, {
    onDelete: 'CASCADE',
    eager: false,
  })
  user!: User

  @Field(() => ID)
  @Column('int')
  cardProposalId!: number

  @Field(() => Int)
  @Column('int', { default: 1 })
  cardProposalQuantity!: number

  @Field(() => ID)
  @Column('int')
  cardRequestId!: number

  @Field(() => Int)
  @Column('int', { default: 1 })
  cardRequestQuantity!: number

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'cardProposalId' })
  cardProposal!: Promise<Card>

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'cardRequestId' })
  cardRequest!: Promise<Card>

  @OneToMany(() => CardTradeRequest, (cardTradeRequest) => cardTradeRequest.userCardTradeProposal)
  tradeRequests!: Promise<CardTradeRequest[]>
}

@InputType()
export class UserCardTradeProposalCreateInput {
  @Field(() => ID)
  userId!: number

  @Field(() => ID)
  cardProposalId!: number

  @Field(() => Int, { nullable: true })
  cardProposalQuantity?: number

  @Field(() => ID)
  cardRequestId!: number

  @Field(() => Int, { nullable: true })
  cardRequestQuantity?: number
}

@InputType()
export class UserCardTradeProposalUpdateInput extends BaseUpdateInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field(() => ID, { nullable: true })
  cardProposalId?: number

  @Field(() => Int, { nullable: true })
  cardProposalQuantity?: number

  @Field(() => ID, { nullable: true })
  cardRequestId?: number

  @Field(() => Int, { nullable: true })
  cardRequestQuantity?: number
}

@InputType()
export class UserCardTradeProposalFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  userId?: number
}
