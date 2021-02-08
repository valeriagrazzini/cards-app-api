import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm'
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

  @ManyToMany(() => Card, { eager: false, cascade: true, onDelete: 'SET NULL' })
  @JoinTable({
    name: 'userCardTradeProposalsOffered_cards',
    joinColumns: [{ name: 'userCardTradeProposalId' }],
    inverseJoinColumns: [{ name: 'cardId' }],
  })
  cardsOffered?: Promise<Card[]>

  @ManyToMany(() => Card, { eager: false, cascade: true, onDelete: 'SET NULL' })
  @JoinTable({
    name: 'userCardTradeProposalsRequested_cards',
    joinColumns: [{ name: 'userCardTradeProposalId' }],
    inverseJoinColumns: [{ name: 'cardId' }],
  })
  cardsRequested?: Promise<Card[]>

  @OneToMany(() => CardTradeRequest, (cardTradeRequest) => cardTradeRequest.userCardTradeProposal)
  tradeRequests!: Promise<CardTradeRequest[]>
}

@InputType()
export class UserCardTradeProposalCreateInput {
  @Field(() => ID)
  userId!: number

  @Field(() => [ID])
  cardsOfferedIds!: number[]

  @Field(() => [ID])
  cardsRequestedIds!: number[]
}

@InputType()
export class UserCardTradeProposalUpdateInput extends BaseUpdateInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field(() => [ID], { nullable: true })
  cardsOfferedIds?: number[]

  @Field(() => [ID], { nullable: true })
  cardsRequestedIds?: number[]
}

@InputType()
export class UserCardTradeProposalFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  userId?: number
}
