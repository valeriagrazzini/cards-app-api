import { Field, ID, InputType, Int, ObjectType, registerEnumType } from 'type-graphql'

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

@ObjectType()
export class BasePaginatedResult {
  @Field(() => Int)
  offset: number

  @Field(() => Int)
  total: number
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

export enum Sorting {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(Sorting, {
  name: 'Sorting',
  description: 'Sortings types',
})

export class BaseOrderInput {
  @Field(() => Sorting, { nullable: true })
  id?: Sorting

  @Field(() => Sorting, { nullable: true })
  createdAt?: Sorting

  @Field(() => Sorting, { nullable: true })
  updatedAt?: Sorting
}
