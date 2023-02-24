import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '~/app/use-cases/sendNotification';
import { CreateNotificationBody } from '../dto/createNotification-body';
import { NotificationPresentation } from '../presentation/notificationPresentation';
import { GetRecipientNotifications } from '~/app/use-cases/getRecipientNotifications';
import { CancelNotification } from '~/app/use-cases/cancelNotification';
import { UnreadNotification } from '~/app/use-cases/unreadNotification';
import { ReadNotification } from '~/app/use-cases/readNotification';
import { CountRecipientNotification } from '~/app/use-cases/countRecipientNotifications';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly sendNotificationService: SendNotification,
    private readonly cancelNotificationService: CancelNotification,
    private readonly findManyNotificationService: GetRecipientNotifications,
    private readonly unreadNotificationService: UnreadNotification,
    private readonly readNotificationService: ReadNotification,
    private readonly countNotificationService: CountRecipientNotification,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const response = await this.sendNotificationService.execute({
      category,
      content,
      recipientId,
    });
    return NotificationPresentation.toHttp(response.notification);
  }

  @Get('from/:recipientId')
  async findMany(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.findManyNotificationService.execute({
      recipientId,
    });

    const notificationsToView = notifications?.map(
      NotificationPresentation.toHttp,
    );

    return {
      notifications: notificationsToView,
    };
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const count = await this.countNotificationService.execute({ recipientId });
    return count;
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationService.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.unreadNotificationService.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.readNotificationService.execute({
      notificationId: id,
    });
  }
}
