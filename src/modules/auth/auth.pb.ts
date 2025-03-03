// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v5.29.3
// source: auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth";

export interface PushNotiRequest {
  data: TokenJson | undefined;
}

export interface PushNotiResponse {
  status: number;
  error: string[];
}

export interface SendmailRequest {
  data: TokenJson | undefined;
}

export interface SendmailResponse {
  status: number;
  error: string[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
}

export interface UserRes {
  email: string;
  name: string;
  phone: string;
  avatar: string;
  uid: string;
  role: string;
  emailVerifiedAt: string;
  googleId: string;
}

export interface RegisterResponse {
  status: number;
  error: string[];
  data?: UserRes | undefined;
}

export interface TokenJson {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  data: TokenJson | undefined;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  data: number;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>;

  login(request: LoginRequest): Observable<LoginResponse>;

  validate(request: ValidateRequest): Observable<ValidateResponse>;

  sendmail(request: SendmailRequest): Observable<SendmailResponse>;

  pushNoti(request: PushNotiRequest): Observable<PushNotiResponse>;
}

export interface AuthServiceController {
  register(request: RegisterRequest): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validate(request: ValidateRequest): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse;

  sendmail(request: SendmailRequest): Promise<SendmailResponse> | Observable<SendmailResponse> | SendmailResponse;

  pushNoti(request: PushNotiRequest): Promise<PushNotiResponse> | Observable<PushNotiResponse> | PushNotiResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "validate", "sendmail", "pushNoti"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
