import { Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '../auth/auth.pb';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ConsumerService {
    private consumerClient: AuthServiceClient;

    @Inject(AUTH_SERVICE_NAME)
    private readonly grpcClient: ClientGrpc;

    public onModuleInit(): void {
        this.consumerClient = this.grpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    async mail({ data }) {
        console.log("🚀 ~ ConsumerService ~ publish ~ data:", data)
        const stream = this.consumerClient.sendmail({ data }).subscribe();

        console.log("🚀 ~ ConsumerService ~ publish ~ stream:", stream)
        // stream
    }
}
