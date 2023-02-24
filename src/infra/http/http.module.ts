import { Module } from '@nestjs/common';
import { SendNotification } from '~/app/use-cases/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controller/notification.controller';
import { CountRecipientNotification } from '~/app/use-cases/countRecipientNotifications';
import { CancelNotification } from '~/app/use-cases/cancelNotification';
import { ReadNotification } from '~/app/use-cases/readNotification';
import { UnreadNotification } from '~/app/use-cases/unreadNotification';
import { GetRecipientNotifications } from '~/app/use-cases/getRecipientNotifications';

@Module({
  controllers: [NotificationController],
  imports: [DatabaseModule],
  providers: [
    SendNotification,
    CancelNotification,
    UnreadNotification,
    ReadNotification,
    GetRecipientNotifications,
    CountRecipientNotification,
  ],
})
export class HttpModule {}
