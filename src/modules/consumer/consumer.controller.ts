import { Controller } from '@nestjs/common';
import { SendMailService } from '../send-mail/send-mail.service';
import { AUTH_SERVICE_NAME } from '../auth/auth.pb';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationsService } from '../notifications/notifications.service';

@Controller('consumer')
export class ConsumerController {
    constructor(
        private sendMailService: SendMailService,
        private notificationsService: NotificationsService,
    ) {

    }
    @GrpcMethod(AUTH_SERVICE_NAME, 'Sendmail')
    sendMailOtp(data) {
        console.log("🚀 ~ ConsumerController ~ sendMailOtp ~ data:", data)
        return { status: 200 }
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'PushNoti')
    sendNotifications(data) {
        console.log("🚀 ~ ConsumerController ~ sendNotifications ~ data:", data)
        return { status: 200 }
    }
}
