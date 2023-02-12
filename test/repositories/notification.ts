import { Notification } from 'src/app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notification';

export class NotificationRepositoryInMemory implements NotificationRepository {
  notifications: Notification[];
  constructor() {
    this.notifications = [];
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
