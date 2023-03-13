import { LitElement } from 'lit';
export declare class FileShare extends LitElement {
    dataChannel: RTCDataChannel | undefined;
    channelId: number;
    shareId: number;
    createRenderRoot(): this;
    constructor();
    createConnection(): void;
    uploadData(): void;
    updateUniqueId(id: number): void;
    recieveData(): void;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=file-share.d.ts.map