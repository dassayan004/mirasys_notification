import { NotificationEntity } from '@/notification/entities/notification.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const entities: EntityClassOrSchema[] = [NotificationEntity];
