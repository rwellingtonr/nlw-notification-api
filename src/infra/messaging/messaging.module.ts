import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka/kafkaConsumerService';
import { KafkaNotificationController } from './kafka/controllers/kafkaNotifications.controller';
import { SendNotification } from '~/app/use-cases/sendNotification';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [KafkaNotificationController],
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  exports: [],
})
export class MessagingModel {}
