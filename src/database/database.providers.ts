/** @format */
import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';

// import * as mongoose from 'mongoose';
// import { MONGODB } from 'utils';
// dotenv.config({
//   path: `${process.cwd()}/.env`,
// });

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // dialectOptions: {
        //   timezone: 'utc'
        // },
        // define: {
        //   timestamps: false
        // }
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    }
  },
  // {
  //   provide: MONGODB.DATABASE_CONNECTION,
  //   useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.MONGO_CONNECTION)
  // }
];
