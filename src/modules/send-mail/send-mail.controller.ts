import { Controller } from '@nestjs/common';
import { GrpcMethod, } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME } from '../auth/auth.pb';
import { SendMailService } from './send-mail.service';

@Controller('send-mail')
export class SendMailController {
    constructor(private sendMailService: SendMailService) {

    }
    @GrpcMethod(AUTH_SERVICE_NAME, 'Sendmail')
    sendMailOtp(data) {
        console.log("🚀 ~ SendMailController ~ sendMailOtp ~ data:", data)
        return { status: 200 }
    }
}
