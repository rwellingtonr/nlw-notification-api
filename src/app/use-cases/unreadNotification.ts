import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification';
import { Error404 } from './errors/error404';

interface UnreadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({ notificationId }: UnreadNotificationRequest): Promise<void> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new Error404(
        `Could not find this notification by id ${notificationId}`,
      );
    }

    notification.unread();
    await this.notificationRepository.update(notification);
  }
}
