import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmsController } from './sms/sms.controller';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      type: "mysql",
      host: process.env["DB_HOST"] ?? "localhost",
      user: process.env["DB_USER"] ?? "root",
      password: process.env["DB_PASSWORD"] ?? "",
      port: parseInt(process.env["DB_PORT"] ?? "3306"),
      dbName: process.env["DB_NAME"] ?? "sms",
      entitiesTs: ["./src/entities"],
      entities: ["./dist/entities"],
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, SmsController],
  providers: [AppService],
})
export class AppModule {}
