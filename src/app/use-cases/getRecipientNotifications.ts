import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification';
import { Notification } from '../entities/notification';

interface GetRecipientNotificationRequest {
  recipientId: string;
}
interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationRequest): Promise<GetRecipientNotificationResponse> {
    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
