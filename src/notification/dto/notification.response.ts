import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendNotificationResponse {
  @Field() success: boolean;
  @Field() channel: string;
  @Field() to: string;
  @Field({ nullable: true }) message?: string;
  @Field({ nullable: true }) error?: string;
}
