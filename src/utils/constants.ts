/** @format */

export const jwtConstants = {
  secret: 'jwtConstants',
};

export const DB = {
  SEQUELIZE: 'SEQUELIZE',
  DATA_SOURCE: 'DATA_SOURCE',
  USERS_REPOSITORY: 'USERS_REPOSITORY',
  OTP_REPOSITORY: 'OTP_REPOSITORY',
};

export const QUEUES = {
  API: 'API'
}


export enum RMQNotificationChannels {
  SYNC_DEVICE = 'SYNC_DEVICE',
  SYNC_USER = 'SYNC_USER',
  SYNC_CHAT = 'SYNC_CHAT',
  PRIVATE_CHAT_MESSAGE = 'PRIVATE_CHAT_MESSAGE', // Chat 1-1
  GROUP_CHAT_MESSAGE = 'GROUP_CHAT_MESSAGE', // Chat group
  GROUP_CHAT_MENTIONED = 'GROUP_CHAT_MENTIONED', // Name tagged
  GROUP_CHAT_INVITED = 'GROUP_CHAT_INVITED', // Add user to group
  NEW_FRIEND_REQUEST = 'NEW_FRIEND_REQUEST', // Invite add friend
}
