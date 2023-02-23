import { Notification } from '~/app/entities/notification';
import { Notification as InfraNotification } from '@prisma/client';
import { Content } from '~/app/entities/notification/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(infraNotification: InfraNotification): Notification {
    const { id, ...rawNotification } = infraNotification;
    const notification = new Notification(
      {
        ...rawNotification,
        content: new Content(rawNotification.content),
      },
      id,
    );

    return notification;
  }
}
