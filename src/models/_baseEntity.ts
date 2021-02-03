import { ObjectType, Field, ID } from 'type-graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType({ isAbstract: true })
export class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Field(() => Date, { nullable: true })
  @CreateDateColumn()
  readonly createdAt!: Date

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  readonly updatedAt!: Date
}
