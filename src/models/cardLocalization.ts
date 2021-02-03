import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { BaseEntity } from './_baseEntity'
import { Card } from './card'
import { BaseFilterInput, BaseUpdateInput, Languages } from './_baseInputTypes'

@ObjectType()
@Unique('cardLocalizations_index', ['cardId', 'langIsoCode'])
@Entity('cardLocalizations')
export class CardLocalization extends BaseEntity {
  @Field(() => ID)
  @Column('int')
  cardId!: number

  @ManyToOne(() => Card, (card) => card.localizations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  card!: Card

  @Field(() => Languages)
  @Column('text')
  langIsoCode!: Languages

  @Field()
  @Column()
  name!: string
}

@InputType()
export class CardLocalizationCreateInput {
  @Field(() => ID)
  cardId!: number

  @Field(() => Languages)
  langIsoCode!: Languages

  @Field()
  name!: string
}

@InputType()
export class CardLocalizationUpdateInput extends BaseUpdateInput {
  @Field(() => ID, { nullable: true })
  cardId?: number

  @Field(() => Languages, { nullable: true })
  langIsoCode?: Languages

  @Field({ nullable: true })
  name?: string
}

@InputType()
export class CardLocalizationFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  cardId?: number

  @Field(() => Languages, { nullable: true })
  langIsoCode?: Languages

  @Field({ nullable: true })
  name?: string
}
