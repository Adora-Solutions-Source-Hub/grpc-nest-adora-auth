import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '../auth/auth.pb';
import { join } from 'path';
import { ConsumerController } from './consumer.controller';
import { SendMailModule } from '../send-mail/send-mail.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: AUTH_PACKAGE_NAME,
          protoPath: join('node_modules/grpc-nest-proto/proto/auth.proto'),
        },
      },
    ]),
    SendMailModule,
    NotificationsModule
  ],
  providers: [ConsumerService],
  exports: [ConsumerService],
  controllers: [ConsumerController]
})
export class ConsumerModule { }
