import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_SERVICE_NAME, ValidateRequest } from './auth.pb';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto } from './dto/auth.dto';
import { ConsumerService } from '../consumer/consumer.service';

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;
    @Inject(ConsumerService)
    private consumerService: ConsumerService;

    @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
    private async register(payload: RegisterRequestDto) {
        console.log("🚀 ~ AuthController ~ register ~ payload:", payload)
        // return payload;
        const rs = await this.service.register(payload);
        console.log("🚀 ~ AuthController ~ register ~ user:", rs)
        return rs;
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
    private async login(payload: LoginRequestDto) {
        const rs = await this.service.login(payload);
        // const data = {
        //     client: { user },
        //     payload: {
        //         roomId,
        //         content: textBot,
        //         subType: type,
        //         idMessage,
        //         question: content,
        //     },
        // };
        this.consumerService.publish({ data: rs.data });
        return rs;
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
    private async validate(payload: ValidateRequest) {
        console.log("🚀 ~ AuthController ~ validate ~ payload:", payload)
        const rs = await this.service.validate(payload);
        console.log("🚀 ~ AuthController ~ validate ~ rs:", rs)
        return rs;
    }
}
