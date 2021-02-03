import { ObjectType, Field, InputType } from 'type-graphql'
import { Column, Entity, OneToMany } from 'typeorm'
import { Card } from './card'
import { SetLocalization } from './setLocalization'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BaseUpdateInput } from './_baseInputTypes'

@ObjectType()
@Entity('sets')
export class Set extends BaseEntity {
  @Field()
  @Column()
  name!: string

  @OneToMany(() => Card, (card) => card.set)
  cards!: Promise<Card[]>

  @OneToMany(() => SetLocalization, (setLocalization) => setLocalization.set)
  localizations!: Promise<SetLocalization[]>
}

@InputType()
export class SetCreateInput {
  @Field()
  name!: string
}

@InputType()
export class SetUpdateInput extends BaseUpdateInput {
  @Field({ nullable: true })
  name?: string
}

@InputType()
export class SetFilterInput extends BaseFilterInput {
  @Field({ nullable: true })
  name?: string
}
