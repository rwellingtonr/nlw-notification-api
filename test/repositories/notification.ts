import { Notification } from 'src/app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notification';

export class NotificationRepositoryInMemory implements NotificationRepository {
  notifications: Notification[];
  constructor() {
    this.notifications = [];
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const total = this.notifications.filter((notification) => {
      return notification.recipientId === recipientId;
    })?.length;
    return total;
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find((notification) => {
      return notification.id === notificationId;
    });

    return notification ? notification : null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((notification) => {
      return notification.recipientId === recipientId;
    });
  }

  async update(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(({ id }) => {
      return notification.id === id;
    });

    if (index >= 0) {
      this.notifications[index] = notification;
    }
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
