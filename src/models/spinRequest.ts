import { ObjectType, Field, InputType, ID } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm'
import { User } from './user'
import { BaseEntity } from './_baseEntity'
import { BaseFilterInput, BasePaginatedResult, BaseUpdateInput } from './_baseInputTypes'

@ObjectType()
@Unique(['userId', 'link'])
@Entity('spinRequets')
export class SpinRequest extends BaseEntity {
  @Field(() => ID)
  @Column('int')
  userId!: number

  @ManyToOne(() => User, (user) => user.tradeRequests, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'userId' })
  user!: Promise<User>

  @Field(() => String)
  @Column()
  link!: string

  @Field(() => Date)
  @Column()
  expiresAt!: Date
}

@InputType()
export class SpinRequestCreateInput {
  @Field(() => ID)
  userId!: number

  @Field(() => String)
  link!: string
}

@InputType()
export class SpinRequestUpdateInput extends BaseUpdateInput {}

@InputType()
export class SpinRequestFilterInput extends BaseFilterInput {
  @Field(() => ID, { nullable: true })
  userId?: number

  @Field(() => Boolean, { nullable: true })
  isExpired?: boolean
}

@ObjectType()
export class SpinRequestPaginatedResult extends BasePaginatedResult {
  @Field(() => [SpinRequest])
  data: SpinRequest[]
}
