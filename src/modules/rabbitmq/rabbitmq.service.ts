import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { RMQNotificationChannels } from 'src/utils';

@Injectable()
export class RabbitmqService {
  constructor(
    @Inject('NOTIFICATION_RMQ_SERVICE')
    private rmqService: ClientProxy,
  ) { }

  // Publish events
  async publish(channel: RMQNotificationChannels, data: any) {
    const result = this.rmqService.emit(channel, data);
    return result.pipe(timeout(5000));
  }

}
