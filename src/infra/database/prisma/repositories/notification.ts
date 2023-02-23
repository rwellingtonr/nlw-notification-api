import { Injectable } from '@nestjs/common';
import { Notification } from '~/app/entities/notification';
import { NotificationRepository } from '~/app/repositories/notification';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async update(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({ data: raw });
  }

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });
    return;
    // return notification;
  }
}
