var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
let FileShare = class FileShare extends LitElement {
    constructor() {
        super();
        this.channelId = 1;
        this.shareId = 0;
    }
    createRenderRoot() {
        return this;
    }
    createConnection() {
        const connection = new RTCPeerConnection(undefined);
        this.dataChannel = connection.createDataChannel('sendDataChannel', {
            id: this.channelId,
        });
        connection.onicecandidate = (event) => {
            if (event.candidate) {
                connection.addIceCandidate(event.candidate).then(() => { });
            }
        };
        // dataChannel.onopen = (ev: Event) => { };
        // dataChannel.onclose = (ev: Event) => { };
    }
    uploadData() {
        var _a;
        (_a = this.dataChannel) === null || _a === void 0 ? void 0 : _a.send('sample');
    }
    updateUniqueId(id) {
        this.shareId = id;
    }
    recieveData() {
        var _a;
        this.shareId = this.channelId;
        const connection = new RTCPeerConnection(undefined);
        this.dataChannel = connection.createDataChannel('sendDataChannel', {
            id: this.shareId,
        });
        connection.onicecandidate = (event) => {
            if (event.candidate) {
                connection.addIceCandidate(event.candidate).then(() => { });
            }
        };
        (_a = this.dataChannel) === null || _a === void 0 ? void 0 : _a.addEventListener('message', (event) => {
            alert(event.data);
        });
    }
    render() {
        return html `
      <div class="row">
        <div class="col-12">
          <p>Your unique id is ${this.channelId}</p>
        </div>
        <form>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"
              >Example textarea</label
            >
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <button @click=${this.createConnection} part="button">
            Create Connection
          </button>
          <button @click=${this.uploadData} type="submit">Upload File</button>
        </form>
      </div>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Unique Id</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <button
          type="submit"
          @click=${this.recieveData}
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    `;
    }
};
FileShare = __decorate([
    customElement('file-share')
], FileShare);
export { FileShare };
//# sourceMappingURL=file-share.js.map