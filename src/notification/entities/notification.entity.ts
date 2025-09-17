import { NotificationChannel, NotificationStatus } from '@/common/enum';
import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('notifications')
export class NotificationEntity {
  @Field(() => GraphQLUUID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => NotificationChannel)
  @Column({ type: 'text', enum: NotificationChannel })
  channel: NotificationChannel;

  @Field()
  @Column()
  recipient: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subject?: string;

  @Field()
  @Column()
  message: string;

  @Field(() => NotificationStatus)
  @Column({
    type: 'text',
    enum: NotificationStatus,
    default: NotificationStatus.PENDING,
  })
  status: NotificationStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  error?: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }
}
