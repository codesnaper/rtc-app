import { LitElement } from 'lit';
import { LoginUser, UserStatus } from '../model';
export declare class AppVideoCall extends LitElement {
    static styles: import("lit").CSSResult;
    _localVideo: HTMLVideoElement | undefined;
    status: string;
    webcam: boolean;
    audio: boolean;
    recieverName: string | undefined;
    incomingCall: boolean;
    loginUser: LoginUser | undefined;
    websocket: WebSocket;
    peerConnection: RTCPeerConnection;
    configuration: {};
    startMedia(): void;
    sendStatusPayload(status: UserStatus): void;
    sendOfferPayload(offer: object, recieverUsername: string): void;
    sendAnswerPayload(answer: object, recieverUserName: string): void;
    serverListner(): void;
    createCall(recieverName: string): Promise<void>;
    callStarted(answer: RTCSessionDescriptionInit): Promise<void>;
    answerCall(recieverName: string, offer: RTCSessionDescriptionInit): Promise<void>;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=app-video.d.ts.map