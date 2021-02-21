import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { Card } from './card'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes'

@ObjectType()
@Entity('userCardsToDonate')
export class UserCardToDonate extends BaseEntity {
  @Field(() => ID)
  @Index()
  @Column('int')
  userId!: number

  @ManyToOne(() => User, (user) => user.cardsToDonate, {
    onDelete: 'CASCADE',
    eager: false,
  })
  user?: User

  @Field(() => ID)
  @Column('int')
  cardId!: number

  @ManyToOne(() => Card)
  card!: Promise<Card>

  @Field(() => ID)
  @Column('int', { default: 1 })
  quantity!: number
}

@InputType()
export class UserCardToDonateCreateInput {
  @Field(() => ID)
  userId!: number

  @Field(() => ID)
  cardId!: number

  @Field(() => ID, { nullable: true })
  quantity?: number
}

@InputType()
export class UserCardToDonateUpdateInput extends BaseUpdateInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field(() => ID, { nullable: true })
  cardId?: number

  @Field(() => ID, { nullable: true })
  quantity?: number
}

@InputType()
export class UserCardToDonateUpdateQuantityInput {
  @Field(() => ID)
  userId!: number

  @Field(() => ID)
  cardId!: number

  @Field(() => Boolean, { nullable: true })
  remove?: boolean
}

@InputType()
export class UserCardToDonateFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field(() => ID, { nullable: true })
  cardId?: number
}
