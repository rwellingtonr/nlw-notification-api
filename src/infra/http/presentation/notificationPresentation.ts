import { Notification } from '~/app/entities/notification';

export class NotificationPresentation {
  static toHttp(notification: Notification) {
    const notificationResponse = {
      notification: {
        id: notification.id,
        category: notification.category,
        content: notification.content,
        recipientId: notification.recipientId,
      },
    };
    return notificationResponse;
  }
}
