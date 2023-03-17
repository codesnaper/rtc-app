export var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["online"] = 0] = "online";
    UserStatus[UserStatus["offline"] = 1] = "offline";
})(UserStatus || (UserStatus = {}));
export var PayloadType;
(function (PayloadType) {
    PayloadType[PayloadType["status"] = 0] = "status";
    PayloadType[PayloadType["answer"] = 1] = "answer";
    PayloadType[PayloadType["denied"] = 2] = "denied";
    PayloadType[PayloadType["offer"] = 3] = "offer";
    PayloadType[PayloadType["error"] = 4] = "error";
    PayloadType[PayloadType["success"] = 5] = "success";
    PayloadType[PayloadType["ring"] = 6] = "ring";
})(PayloadType || (PayloadType = {}));
//# sourceMappingURL=index.js.map