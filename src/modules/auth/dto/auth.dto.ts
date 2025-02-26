/** @format */

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, ValidateIf } from 'class-validator';
import { LoginRequest, RegisterRequest, } from '../auth.pb';

export class LoginRequestDto implements LoginRequest {
  @IsEmail()
  @ApiProperty()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty()
  public readonly password: string;

}

export class RegisterRequestDto extends LoginRequestDto implements RegisterRequest {
  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  name: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  avatar: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  phone: string;
}

export class ValidateRequestDto {
  @ApiProperty()
  token: string;
}
