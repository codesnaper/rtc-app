export type LoginUser = {
  username: string;
  password: string;
};

export enum UserStatus {
  online,
  offline,
}

export enum PayloadType {
  status,
  answer,
  denied,
  offer,
  error,
  success,
  ring,
}

export interface User {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  username: string;
  status?: UserStatus;
  connectionId?: string;
  _id?: string;
}

export interface Payload {
  type: PayloadType;
  recieverUserName: string;
  sendUser: User;
  offer?: object;
  answer?: object;
  message?: string;
  status?: UserStatus;
}
