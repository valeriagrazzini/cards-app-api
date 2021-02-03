import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Column, Entity, ManyToOne, Unique } from 'typeorm'
import { BaseEntity } from './_baseEntity'
import { Set } from './set'
import { BaseFilterInput, BaseUpdateInput, Languages } from './_baseInputTypes'

@ObjectType()
@Unique('setLocalizations_index', ['setId', 'langIsoCode'])
@Entity('setLocalizations')
export class SetLocalization extends BaseEntity {
  @Field(() => ID)
  @Column('int')
  setId!: number

  @ManyToOne(() => Set, (set) => set.localizations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  set!: Set

  @Field(() => Languages)
  @Column('text')
  langIsoCode!: Languages

  @Field()
  @Column()
  name!: string
}

@InputType()
export class SetLocalizationCreateInput {
  @Field(() => ID)
  setId!: number

  @Field(() => Languages)
  langIsoCode!: Languages

  @Field()
  name!: string
}

@InputType()
export class SetLocalizationUpdateInput extends BaseUpdateInput {
  @Field(() => ID, { nullable: true })
  setId?: number

  @Field(() => Languages, { nullable: true })
  langIsoCode?: Languages

  @Field({ nullable: true })
  name?: string
}

@InputType()
export class SetLocalizationFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  setId?: number

  @Field(() => Languages, { nullable: true })
  langIsoCode?: Languages

  @Field({ nullable: true })
  name?: string
}
