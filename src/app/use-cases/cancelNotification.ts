import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification';
import { Error404 } from './errors/error404';

interface CancelNotificationRequest {
  notificationId: string;
}

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({ notificationId }: CancelNotificationRequest): Promise<void> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new Error404(
        `Could not find this notification by id ${notificationId}`,
      );
    }

    notification.cancel();
    await this.notificationRepository.update(notification);
  }
}
