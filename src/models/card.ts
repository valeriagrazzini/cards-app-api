import { ObjectType, Field, ID, Int, InputType } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntity } from './_baseEntity'
import { Set } from './set'
import { CardLocalization } from './cardLocalization'
import { BaseFilterInput, BaseOrderInput, BaseUpdateInput, Sorting } from './_baseInputTypes'
import { CardTradeOffer } from './cardTradeOffer'
import { CardTradeRequest } from './cardTradeRequest'

@ObjectType()
@Entity('cards')
export class Card extends BaseEntity {
  @Field()
  @Column()
  name!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  pictureUrl?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  pictureThumbUrl?: string

  @Field(() => ID)
  @Column('int')
  setId!: number

  @ManyToOne(() => Set, (set) => set.cards, {
    onDelete: 'CASCADE',
    eager: false,
  })
  set!: Promise<Set>

  @Field(() => Int)
  @Column({ default: 1 })
  rating!: number

  @Field(() => Boolean)
  @Column({ default: false })
  isGold!: boolean

  @Field(() => Int)
  @Column({ default: 0 })
  stars!: number

  @Field(() => Int)
  @Column({ default: 0 })
  order!: number

  @OneToMany(() => CardLocalization, (cardLocalization) => cardLocalization.card)
  localizations!: CardLocalization[]

  @OneToMany(() => CardTradeOffer, (cardTradeOffer) => cardTradeOffer.card)
  tradeCardsOffered?: CardTradeOffer[]

  @OneToMany(() => CardTradeRequest, (cardTradeRequest) => cardTradeRequest.card)
  tradeCardsRequested?: CardTradeRequest[]
}

@InputType()
export class CardCreateInput {
  @Field()
  name!: string

  @Field({ nullable: true })
  pictureUrl?: string

  @Field({ nullable: true })
  pictureThumbUrl?: string

  @Field(() => ID)
  setId!: number

  @Field(() => Int, { nullable: true })
  rating?: number

  @Field(() => Boolean)
  isGold!: boolean

  @Field(() => Int)
  stars!: number

  @Field(() => Int)
  order!: number
}

@InputType()
export class CardUpdateInput extends BaseUpdateInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  pictureUrl?: string

  @Field({ nullable: true })
  pictureThumbUrl?: string

  @Field(() => ID, { nullable: true })
  setId?: number

  @Field(() => Int, { nullable: true })
  rating?: number

  @Field(() => Boolean, { nullable: true })
  isGold?: boolean

  @Field(() => Int, { nullable: true })
  stars?: number

  @Field(() => Int, { nullable: true })
  order?: number
}

@InputType()
export class CardFilterInput extends BaseFilterInput {
  @Field(() => [ID], { nullable: true })
  ids?: number[]

  @Field(() => ID, { nullable: true })
  setId?: number
}

@InputType()
export class CardOrderInput extends BaseOrderInput {
  @Field(() => Sorting, { nullable: true })
  setId?: Sorting

  @Field(() => Sorting, { nullable: true })
  order?: Sorting
}
