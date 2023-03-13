import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('file-share')
export class FileShare extends LitElement {
  dataChannel: RTCDataChannel | undefined;

  channelId: number;

  shareId: number;

  override createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.channelId = 1;
    this.shareId = 0;
  }

  createConnection() {
    const connection: RTCPeerConnection = new RTCPeerConnection(undefined);
    this.dataChannel = connection.createDataChannel('sendDataChannel', {
      id: this.channelId,
    });
    connection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        connection.addIceCandidate(event.candidate).then(() => {});
      }
    };
    // dataChannel.onopen = (ev: Event) => { };
    // dataChannel.onclose = (ev: Event) => { };
  }

  uploadData() {
    this.dataChannel?.send('sample');
  }

  updateUniqueId(id: number) {
    this.shareId = id;
  }

  recieveData() {
    this.shareId = this.channelId;
    const connection: RTCPeerConnection = new RTCPeerConnection(undefined);
    this.dataChannel = connection.createDataChannel('sendDataChannel', {
      id: this.shareId,
    });
    connection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        connection.addIceCandidate(event.candidate).then(() => {});
      }
    };
    this.dataChannel?.addEventListener('message', (event) => {
      alert(event.data);
    });
  }

  override render() {
    return html`
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
}
