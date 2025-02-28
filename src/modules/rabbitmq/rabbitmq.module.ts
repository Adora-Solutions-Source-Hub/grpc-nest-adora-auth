import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUES } from 'src/utils';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_RMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`${process.env.RABBITMQ_URI}/%2Fapi`],
          queue: QUEUES.API,
          queueOptions: {
            durable: true,
            reconnect: true,
            reconnectDelay: 5000,
          },
        },
      },
    ]),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule { }
