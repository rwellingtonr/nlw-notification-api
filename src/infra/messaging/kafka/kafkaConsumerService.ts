import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        brokers: ['ruling-crane-13728-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cnVsaW5nLWNyYW5lLTEzNzI4JPyY3XrKX4904EJKSnulwrYoXU9RnrD9oXe3I_s',
          password: '6d787be264424e399a18537c7549adc9',
        },
        ssl: true,
        clientId: 'notifications',
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
