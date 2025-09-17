import { NotificationEntity } from '@/notification/entities/notification.entity';
import { EntitySchema, MixedList } from 'typeorm';

export const entities: MixedList<Function | string | EntitySchema<any>> = [
  NotificationEntity,
];
