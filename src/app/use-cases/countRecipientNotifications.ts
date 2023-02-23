import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notification';

interface CountRecipientNotificationRequest {
  recipientId: string;
}
interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationRequest): Promise<CountRecipientNotificationResponse> {
    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
