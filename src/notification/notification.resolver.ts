import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { NotificationEntity } from './entities/notification.entity';
import { SendNotificationInput } from './dto/notification.input';

@Resolver(() => NotificationEntity)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => [NotificationEntity], { name: 'notifications' })
  async notifications(): Promise<NotificationEntity[]> {
    return this.notificationService.findAll();
  }

  @Mutation(() => NotificationEntity, { name: 'sendNotification' })
  async sendNotification(
    @Args('sendNotification') sendNotification: SendNotificationInput,
  ): Promise<NotificationEntity> {
    return await this.notificationService.CREATE(sendNotification);
  }
}
