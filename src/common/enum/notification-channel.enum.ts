import { registerEnumType } from '@nestjs/graphql';

export enum NotificationChannel {
  ONESIGNAL = 'onesignal',
  TELEGRAM = 'telegram',
  WHATSAPP = 'whatsapp',
  DISCORD = 'discord',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

registerEnumType(NotificationChannel, { name: 'NotificationChannel' });
registerEnumType(NotificationStatus, { name: 'NotificationStatus' });
