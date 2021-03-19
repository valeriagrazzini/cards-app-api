import { ObjectType, Field, InputType, ID, Int } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Card } from './card'
import { UserCardTradeProposal } from './userCardTradeProposal'

import { BaseEntity } from './_baseEntity'
import { BaseFilterInput } from './_baseInputTypes'

@ObjectType()
@Entity('cardTradeOffers')
export class CardTradeOffer extends BaseEntity {
  @Field(() => ID)
  @Column('int')
  cardTradeProposalId!: number

  @Field(() => ID)
  @Column('int')
  cardId!: number

  @Field(() => Int)
  @Column('int')
  quantity!: number

  @ManyToOne(() => UserCardTradeProposal, (uctp) => uctp.cardsOffered, {
    onDelete: 'CASCADE',
    eager: false,
  })
  cardTradeProposal!: UserCardTradeProposal

  @ManyToOne(() => Card, (card) => card.tradeCardsOffered, {
    onDelete: 'CASCADE',
    eager: false,
  })
  card!: Card
}

@InputType()
export class CardTradeOfferCreateInput {
  @Field(() => ID, { nullable: true })
  cardTradeProposalId?: number

  @Field(() => ID)
  cardId!: number

  @Field(() => Int)
  quantity!: number
}

@InputType()
export class CardTradeOfferUpdateInput {
  @Field(() => ID, { nullable: true })
  id?: number

  @Field(() => ID, { nullable: true })
  cardTradeProposalId?: number

  @Field(() => ID, { nullable: true })
  cardId?: number

  @Field(() => Int, { nullable: true })
  quantity?: number
}

@InputType()
export class CardTradeOfferFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  cardTradeProposalId?: number

  @Field(() => ID, { nullable: true })
  cardId?: number
}
