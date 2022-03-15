import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsController } from './sms/sms.controller';

@Module({
  imports: [],
  controllers: [AppController, SmsController],
  providers: [AppService],
})
export class AppModule {}
