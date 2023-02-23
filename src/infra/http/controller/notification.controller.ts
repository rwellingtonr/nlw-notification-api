import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '~/app/use-cases/sendNotification';
import { CreateNotificationBody } from '../dto/createNotification-body';
import { NotificationPresentation } from '../presentation/notificationPresentation';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const response = await this.notificationService.execute({
      category,
      content,
      recipientId,
    });
    return NotificationPresentation.toHttp(response.notification);
  }
}
