import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendNotification } from '~/app/use-cases/sendNotification';

@Controller()
export class KafkaNotificationController {
  constructor(private readonly sendNotification: SendNotification) {}

  @EventPattern('notification')
  async handleSendNotification(@Payload() content: any) {
    await this.sendNotification.execute(content);
  }
}
