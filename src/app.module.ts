import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { RabbitmqModule } from './modules/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitmqModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
