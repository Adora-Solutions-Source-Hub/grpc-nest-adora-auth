import { Controller, Inject, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_SERVICE_NAME, ValidateResponse } from './auth.pb';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto, ValidateRequestDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

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

        return rs;
    }

    @GrpcMethod(AUTH_SERVICE_NAME, 'Validate')
    private validate(payload: ValidateRequestDto): Promise<ValidateResponse> {
        return this.service.validate(payload);
    }
}
