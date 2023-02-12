import { Injectable } from '@nestjs/common';
import { Notification } from '~/app/entities/notification';
import { NotificationRepository } from '~/app/repositories/notification';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    category,
    content,
    createdAt,
    readAt,
    recipientId,
    id,
  }: Notification): Promise<void> {
    await this.prisma.notification.create({
      data: {
        id,
        category,
        content: content.value,
        recipientId,
        readAt,
        createdAt,
      },
    });
  }
}
