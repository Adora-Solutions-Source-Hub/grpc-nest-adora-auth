/** @format */

import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { DB } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  constructor(
    @Inject(DB.USERS_REPOSITORY)
    private usersRepository: typeof User,
    private jwtService: JwtService
  ) { }

  //find one by email
  async getOne(filter: any): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: filter, raw: true });
  }

  private async signToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      status: HttpStatus.OK
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: "1d",
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: "2d",
    });
    return { accessToken, refreshToken };
  }
}
