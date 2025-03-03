import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { SendMailModule } from './modules/send-mail/send-mail.module';
import { ConsumerModule } from './modules/consumer/consumer.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SendMailModule,
    ConsumerModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
