import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { UserCardTradeRequest } from './userCardTradeRequest'
import { User } from './user'
import { CardTradeOffer, CardTradeOfferCreateInput, CardTradeOfferUpdateInput } from './cardTradeOffer'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes'
import { CardTradeRequest, CardTradeRequestCreateInput, CardTradeRequestUpdateInput } from './cardTradeRequest'

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

  @OneToMany(() => CardTradeOffer, (cardTradeOffer) => cardTradeOffer.cardTradeProposal)
  cardsOffered!: Promise<CardTradeOffer[]>

  @OneToMany(() => CardTradeRequest, (cardTraderequest) => cardTraderequest.cardTradeProposal)
  cardsRequested!: Promise<CardTradeRequest[]>

  @OneToMany(() => UserCardTradeRequest, (userCardTradeRequest) => userCardTradeRequest.userCardTradeProposal)
  tradeRequests!: Promise<UserCardTradeRequest[]>
}

@InputType()
export class UserCardTradeProposalCreateInput {
  @Field(() => ID)
  userId!: number

  @Field(() => [CardTradeOfferCreateInput])
  cardsOffered!: CardTradeOfferCreateInput[]

  @Field(() => [CardTradeRequestCreateInput])
  cardsRequested!: CardTradeRequestCreateInput[]
}

@InputType()
export class UserCardTradeProposalUpdateInput extends BaseUpdateInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field(() => [CardTradeOfferUpdateInput], { nullable: true })
  cardsOffered?: CardTradeOfferUpdateInput[]

  @Field(() => [CardTradeRequestUpdateInput], { nullable: true })
  cardsRequested?: CardTradeRequestUpdateInput[]
}

@InputType()
export class UserCardTradeProposalFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  userId?: number
}
