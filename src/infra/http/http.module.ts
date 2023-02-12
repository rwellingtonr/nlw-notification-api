import { Module } from '@nestjs/common';
import { SendNotification } from '~/app/use-cases/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controller/notification.controller';

@Module({
  controllers: [NotificationController],
  imports: [DatabaseModule],
  providers: [SendNotification],
})
export class HttpModule {}
