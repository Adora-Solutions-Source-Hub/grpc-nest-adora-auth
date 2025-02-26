/** @format */

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Default,
  AllowNull,
} from 'sequelize-typescript';
import { Role } from 'src/config/role';

@Table({ modelName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @AllowNull
  @Column
  email_verified_at: Date;

  @Column
  password: string;

  @AllowNull
  @Column
  avatar: string;

  @AllowNull
  @Column
  phone: string;

  @Default(Role.USER)
  @Column
  role: string;

  @AllowNull
  @Column
  google_id: string;

  @AllowNull
  @Column
  device_id: string;

  @AllowNull
  @Column
  deleted_at: Date;
}
