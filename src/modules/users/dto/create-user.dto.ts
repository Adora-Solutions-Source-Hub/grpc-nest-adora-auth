/** @format */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateIf } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  password: string;

  @ApiPropertyOptional()
  @ValidateIf((object, value) => value !== null)
  avatar: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  hash: string;
}

