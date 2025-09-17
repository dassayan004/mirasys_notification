import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { SendNotificationInput } from './dto/notification.input';


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
    const notification = this.createNotification(input);
    return await this.repo.save(notification);
  }
}
