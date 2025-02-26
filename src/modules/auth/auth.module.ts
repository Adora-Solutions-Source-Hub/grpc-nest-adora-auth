import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || "",
            signOptions: { expiresIn: "1d" },
        }),
        UsersModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
