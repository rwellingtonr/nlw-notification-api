import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { MessagingModel } from './infra/messaging/messaging.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, MessagingModel],
})
export class AppModule {}
