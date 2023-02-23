import { Injectable } from '@nestjs/common';
import { Notification } from '~/app/entities/notification';
import { NotificationRepository } from '~/app/repositories/notification';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const total = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });
    return total;
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    const notificationsDomain = notifications?.map(
      PrismaNotificationMapper.toDomain,
    );
    return notificationsDomain;
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({ data: raw });
  }
  async update(notification: Notification): Promise<void> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: { id: notification.id },
      data: rawNotification,
    });
  }
  async findById(notificationId: string): Promise<Notification> {
    const notificationFound = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    if (!notificationFound) {
      return null;
    }
    const notification = PrismaNotificationMapper.toDomain(notificationFound);

    return notification;
  }
}
