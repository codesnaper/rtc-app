import { LitElement } from 'lit';
export declare class AppVideoCall extends LitElement {
    static styles: import("lit").CSSResult;
    _localVideo: HTMLVideoElement | undefined;
    online: boolean;
    wssConnection: WebSocket;
    configuration: {
        iceServers: ({
            urls: string;
            username?: undefined;
            credential?: undefined;
        } | {
            urls: string;
            username: string;
            credential: string;
        })[];
    };
    constructor();
    makeCall(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=app-video.d.ts.map