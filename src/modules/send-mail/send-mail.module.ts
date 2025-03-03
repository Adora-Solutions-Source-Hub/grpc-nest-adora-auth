/** @format */

import { Module } from '@nestjs/common';
import { SendMailService } from './send-mail.service';
import { SendMailController } from './send-mail.controller';

@Module({
  providers: [SendMailService],
  exports: [SendMailService],
  controllers: [SendMailController],
})
export class SendMailModule { }
