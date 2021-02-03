import { Field, ID, InputType, registerEnumType } from 'type-graphql'

@InputType({ isAbstract: true })
export class BaseUpdateInput {
  @Field(() => ID)
  id!: number
}

@InputType({ isAbstract: true })
export class BaseFilterInput {
  @Field(() => ID, { nullable: true })
  id?: number

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date
}

export enum Languages {
  Italiano = 'IT',
  Portuguese = 'PT',
  English = 'EN',
}
registerEnumType(Languages, {
  name: 'Languages',
  description: 'Available Languages',
})
