import { NotificationChannel } from '@/common/enum/notification-channel.enum';
import { OneSignalPlatform } from '@/common/enum/onesignal-platform.enum';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class OneSignalOptionsInput {
  @Field(() => [OneSignalPlatform], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsEnum(OneSignalPlatform, { each: true })
  platforms?: OneSignalPlatform[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includePlayerIds?: string[];
}

@InputType()
export class TelegramOptionsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  parseMode?: string;

  @Field({ nullable: true })
  @IsOptional()
  disableWebPagePreview?: boolean;
}

@InputType()
export class WhatsAppOptionsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  mediaUrl?: string;
}

@InputType()
export class DiscordOptionsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}

@InputType()
export class SendNotificationInput {
  @Field(() => NotificationChannel)
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @Field()
  @IsString()
  to: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  subject?: string;

  @Field()
  @IsString()
  message: string;

  @Field(() => OneSignalOptionsInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => OneSignalOptionsInput)
  oneSignal?: OneSignalOptionsInput;

  @Field(() => TelegramOptionsInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => TelegramOptionsInput)
  telegram?: TelegramOptionsInput;

  @Field(() => WhatsAppOptionsInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => WhatsAppOptionsInput)
  whatsapp?: WhatsAppOptionsInput;

  @Field(() => DiscordOptionsInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => DiscordOptionsInput)
  discord?: DiscordOptionsInput;
}
