export declare type LoginUser = {
    username: string;
    password: string;
};
export declare enum UserStatus {
    online = 0,
    offline = 1
}
export declare enum PayloadType {
    status = 0,
    answer = 1,
    denied = 2,
    offer = 3,
    error = 4,
    success = 5,
    ring = 6
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
//# sourceMappingURL=index.d.ts.map