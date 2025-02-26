/** @format */

import { DB } from 'src/utils';
import { User } from './user.entity';

export const usersProviders = [
  {
    provide: DB.USERS_REPOSITORY,
    useValue: User,
  },
];
