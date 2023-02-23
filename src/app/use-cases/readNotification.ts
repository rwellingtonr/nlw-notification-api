import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification';
import { Error404 } from './errors/error404';

interface ReadNotificationRequest {
  notificationId: string;
}

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({ notificationId }: ReadNotificationRequest): Promise<void> {
    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new Error404(
        `Could not find this notification by id ${notificationId}`,
      );
    }

    notification.read();
    await this.notificationRepository.update(notification);
  }
}
