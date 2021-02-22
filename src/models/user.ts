import { UserRole } from '@/auth/role'
import { UserI } from '@/auth/user.interface'
import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { Column, Entity, OneToMany } from 'typeorm'
import { UserCardTradeProposal } from './userCardTradeProposal'
import { BaseEntity } from './_baseEntity'
import { BaseUpdateInput, BaseFilterInput, BasePaginatedResult, Languages } from './_baseInputTypes'
import { UserCardToDonate } from './userCardToDonate'
import { CardTradeRequest } from './cardTradeRequest'

@ObjectType()
@Entity('users')
export class User extends BaseEntity implements UserI {
  @Field()
  @Column()
  userName!: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  facebookId?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePictureUrl?: string

  @Column({ nullable: true })
  password?: string

  @Field(() => String)
  @Column({ default: Languages.English })
  lang!: string

  @Field(() => [String])
  @Column('text', { array: true })
  roles?: UserRole[]

  @Field(() => Int)
  @Column({ default: 0 })
  rating!: number

  @Field(() => Int)
  @Column({ default: 0 })
  points!: number

  @Field(() => Boolean)
  @Column({ default: false })
  isBanned!: boolean

  @Field(() => Boolean)
  @Column({ default: false })
  isDeleted!: boolean

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  deletedAt?: Date

  @OneToMany(() => UserCardTradeProposal, (userCardTradeProposal) => userCardTradeProposal.user)
  tradeProposals!: Promise<UserCardTradeProposal[]>

  @OneToMany(() => CardTradeRequest, (cardTradeRequest) => cardTradeRequest.user)
  tradeRequests!: Promise<CardTradeRequest[]>

  @OneToMany(() => UserCardToDonate, (userCardToDonate) => userCardToDonate.user)
  cardsToDonate!: Promise<UserCardToDonate[]>
}

@InputType()
export class UserCreateInput {
  @Field()
  userName!: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  facebookId?: string

  @Field({ nullable: true })
  profilePictureUrl?: string

  @Field({ nullable: true })
  password?: string
}

@InputType()
export class UserUpdateInput extends BaseUpdateInput {
  @Field({ nullable: true })
  userName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  facebookId?: string

  @Field({ nullable: true })
  profilePictureUrl?: string

  @Field(() => String)
  roles?: UserRole[]

  @Field(() => Int)
  rating!: number

  @Field(() => Int)
  points!: number

  @Field(() => Boolean, { nullable: true })
  isBanned?: boolean

  @Field(() => Boolean, { nullable: true })
  isDeleted?: boolean

  @Field(() => Date, { nullable: true })
  deletedAt?: Date
}

@InputType()
export class UserFilterInput extends BaseFilterInput {
  @Field({ nullable: true })
  userName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  facebookId?: string

  @Field(() => Boolean, { nullable: true })
  isBanned?: boolean

  @Field(() => Boolean, { nullable: true })
  isDeleted?: boolean
}

@ObjectType()
export class UserPaginatedResult extends BasePaginatedResult {
  @Field(() => [User])
  data: User[]
}
