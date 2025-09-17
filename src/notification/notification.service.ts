import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { Repository } from 'typeorm';
import {
  ErrorMessage,
  NotificationStatus,
  PostgresErrorCode,
} from '@/common/enum';
import { SendNotificationInput } from './dto/notification.input';
import { BaseGraphQLError } from '@/common/filters/base-graphql-error';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repo: Repository<NotificationEntity>,
  ) {}
  async findAll(): Promise<NotificationEntity[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
  private createNotification(input: SendNotificationInput): NotificationEntity {
    return this.repo.create({
      channel: input.channel,
      message: input.message,
      recipient: input.to,
      subject: input.subject,
    });
  }
  async CREATE(input: SendNotificationInput) {
    try {
      const notification = this.createNotification(input);

      return await this.repo.save(notification);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BaseGraphQLError(
          ErrorMessage.UserAlreadyExists,
          'NOTIFICATION_ALREADY_EXISTS',
          HttpStatus.CONFLICT,
        );
      }

      throw new BaseGraphQLError(
        error,
        'INTERNAL_SERVER_ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
